### Setup
- Setting Up MongoDB Connection
  To use MongoDB as the database for this project, follow these steps:
  1. Create a MongoDB Atlas Account
    - Sign up or log in to MongoDB Atlas - https://cloud.mongodb.com
    - Set up a new cluster and create database credentials.
  2. Update the MONGO_URI in server.js
    - Replace [userName] and [password] with your actual database credentials in the MONGO_URI environment variable or directly in server.js:
    const MONGO_URI = 'mongodb+srv://[userName]:[password]@cluster0.nxti6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  3. Ensure Your IP is Whitelisted
    - In MongoDB Atlas, navigate to Network Access and add your current IP (0.0.0.0/0 for public access).
- Run `npm install --legacy-peer-deps` in the root of the project to install dependencies
- Access the application at `localhost:4000` in your browser
