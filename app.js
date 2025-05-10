require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const Url = require("./models/url");
const generateHash = require("./utils/hashGenerator");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Connect to Redis
const redisClient = redis.createClient();
redisClient.connect().then(() => {
    console.log("Connected to Redis");
});

app.use(express.json());

// Shorten URL
app.post("/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        let hash = generateHash(url);

        // Check for collisions and regenerate if necessary
        while (await Url.findOne({ hash })) {
            hash = generateHash(url + Math.random());
        }

        const newUrl = new Url({ hash, originalUrl: url });
        await newUrl.save();

        // Cache the short URL
        await redisClient.setEx(hash, 3600, url);

        res.json({ shortUrl: `${process.env.BASE_URL}:${PORT}/${hash}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Redirect to Original URL
app.get("/:hash", async (req, res) => {
    const { hash } = req.params;

    try {
        // Check Redis cache first
        const cachedUrl = await redisClient.get(hash);

        if (cachedUrl) {
            console.log("Getting URL from cache");
            return res.redirect(cachedUrl);
        }

        // If not found in cache, query the database
        const urlEntry = await Url.findOne({ hash });

        if (!urlEntry) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Cache the URL for subsequent requests
        await redisClient.setEx(hash, 3600, urlEntry.originalUrl);

        res.redirect(urlEntry.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
