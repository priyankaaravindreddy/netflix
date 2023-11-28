/** @type {import('next').NextConfig} */
// next.config.js
const dotenv = require('dotenv');
dotenv.config();

// module.exports = {
//   env: {
//     MONGODB_URI: process.env.MONGODB_URI,
//   },
// };

const nextConfig = { env: {
    MONGO_URI: process.env.MONGO_URI,
  },}

module.exports = nextConfig
