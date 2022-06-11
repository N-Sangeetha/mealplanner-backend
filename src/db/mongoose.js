const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/mealplanner-api', {
// mongoose.connect('mongodb+srv://vercel-admin-user:Bokko@456@cluster0.fz8tz.mongodb.net/?retryWrites=true&w=majority', {
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useNewUrlParser: true,
// });

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vercel-admin-user:' + encodeURIComponent('Bokko@456') +'@cluster0.fz8tz.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log("Connection Error : ", err.message);
  }
};

module.exports = connectDB;