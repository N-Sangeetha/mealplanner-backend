const mongoose = require('mongoose');
const username = encodeURIComponent('sangeetha')
const password = encodeURIComponent('sangeetha123')
const cluster = encodeURIComponent('cluster0.okynr.mongodb.net')
// mongoose.connect('mongodb://127.0.0.1:27017/mealplanner-api', {
// mongoose.connect('mongodb+srv://vercel-admin-user:Bokko@456@cluster0.fz8tz.mongodb.net/?retryWrites=true&w=majority', {
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useNewUrlParser: true,
// });
var uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
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