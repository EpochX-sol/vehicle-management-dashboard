const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv'); 
 
const vehicleRoutes = require('./routes/vehicleRoutes');
 
const { errorHandler, AppError } = require('./middlewares/errorHandler');
const connectDB = require('./config/database');
 
dotenv.config();
 
const app = express();
 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','UPDATE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`.blue);
    next();
  });
}
 
app.use('/api/vehicles', vehicleRoutes);
 
 
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
 
app.use(errorHandler);
 
connectDB()
 
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
 
process.on('unhandledRejection', (err) => {
  console.error('💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
