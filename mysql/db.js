// const mysql = require('mysql2/promise');  // Use the promise-based version
// require("dotenv").config();

// // Create the connection pool
// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// async function main() {
//     try {
//         console.log('Connected to MySQL.');

//         // Create the database if it doesn't exist
//         await db.query('CREATE DATABASE IF NOT EXISTS offernmove');

//         // Switch to the "offernmove" database (in case it was just created)
//         await db.query('USE offernmove');

//         // Create "structure" table
//         const createStructureTable = `
//             CREATE TABLE IF NOT EXISTS structure (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 struct VARCHAR(255) NOT NULL
//             );
//         `;
//         await db.query(createStructureTable);

//         // Create "address" table
//         const createAddressTable = `
//             CREATE TABLE IF NOT EXISTS address (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 flat VARCHAR(255) NOT NULL,
//                 street VARCHAR(255) NOT NULL,
//                 landmark VARCHAR(255),
//                 district VARCHAR(255),
//                 city VARCHAR(255) NOT NULL,
//                 state VARCHAR(255) NOT NULL,
//                 pin VARCHAR(10) NOT NULL
//             );
//         `;
//         await db.query(createAddressTable);

//         // Create "hosting_data" table
//         const createHostingDataTable = `
//             CREATE TABLE IF NOT EXISTS hosting_data (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 bedroom INT NOT NULL,
//                 hall INT NOT NULL,
//                 kitchen INT NOT NULL
//             );
//         `;
//         await db.query(createHostingDataTable);

//         // Create "photos" table
//         const createPhotosTable = `
//             CREATE TABLE IF NOT EXISTS photos (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 user_id INT NOT NULL,
//                 Userphotos LONGBLOB NOT NULL,
//                 uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );
//         `;
//         await db.query(createPhotosTable);

//         // Create "reviews" table
//         const createReviewsTable = `
//             CREATE TABLE IF NOT EXISTS reviews (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 email VARCHAR(255) NOT NULL,
//                 title VARCHAR(255) NOT NULL,
//                 rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
//                 review TEXT NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );
//         `;
//         await db.query(createReviewsTable);

//     } catch (err) {
//         console.error('Error:', err);
//     }
// }

// main();
// module.exports = db;
