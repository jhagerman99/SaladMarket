Salad Market

This project provides a simple RESTful API for managing salad recipes and ingredients. It includes endpoints to fetch, create, update, and delete recipes.


Setup Instructions


Prerequisites
Node.js (v14.x or later)
npm (v6.x or later)


Installation

Clone the repository:
git clone https://github.com/yourusername/SaladMarket.git
cd SaladMaket


Install dependencies:

npm install

npm install react react-dom

npm install react-icons --save


Start the server:
npm run dev

The server will start on http://localhost:3000.


Considerations and Assumptions
This implementation uses an in-memory data structure, so data will be lost upon server restart.
Unique id generation is based on the length of the current data array, which may not be suitable for production use.
Error handling is basic and can be extended for better robustness.
This API is designed for educational purposes and may require modifications for production use.
