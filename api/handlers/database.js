const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

exports.DatabaseConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected.'))
    .catch((error) => {
      if (error.message.startsWith('Invalid connection string')) {
        error.message = 'Error: Invalid connection string.';
      }
      console.log(`Error connecting to the database.\n${error.message}`);
      process.exit(1);
    });
};
