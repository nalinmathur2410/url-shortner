# URL Shortener

A lightweight Node.js application that allows users to shorten long URLs into concise, shareable links. This project is ideal for developers interested in understanding the fundamentals of URL shortening services.

## Features

* **URL Shortening**: Convert lengthy URLs into shorter, manageable links.
* **Redirection**: Accessing the shortened URL redirects users to the original long URL.
* **Unique Identifiers**: Generates unique short codes for each URL to prevent duplication.
* **Persistent Storage**: Stores URL mappings using a JSON-based database for simplicity.

## Tech Stack

* **Backend**: Node.js with Express.js framework.
* **Database**: JSON file-based storage using `lowdb`.
* **Utilities**: Custom modules for URL validation and short code generation.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or later)
* [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nalinmathur2410/url-shortner.git
   cd url-shortner
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the application**:

   ```bash
   node app.js
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### POST `/shorten`

* **Description**: Shortens a provided long URL.

* **Request Body**:

  ```json
  {
    "longUrl": "https://www.example.com"
  }
  ```

* **Response**:

  ```json
  {
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### GET `/:shortCode`

* **Description**: Redirects to the original long URL associated with the provided short code.

## Environment Variables

Create a `.env` file in the root directory and define the following variables:

```
MONGO_URI=mongodb://localhost:27017/urlShortener
BASE_URL=http://localhost
PORT=3000
HASH_LENGTH=6
```

You can adjust the values as needed for your setup.

Create a `.env` file in the root directory and define the following variables:

```
PORT=3000
DB_PATH=./data/db.json
BASE_URL=http://localhost:3000
```

You can adjust the values as needed for your setup.

## Project Structure

```
url-shortner/
├── models/
│   └── urlModel.js       # Handles data storage and retrieval
├── utils/
│   ├── generateShortCode.js  # Generates unique short codes
│   └── validateUrl.js        # Validates URL format
├── app.js                # Main application file
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## License

This project is licensed under the [MIT License](https://github.com/nalinmathur2410/url-shortner/blob/main/LICENSE).
