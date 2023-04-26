const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/react_db';

// const connectDatabase = async () => {
//     try {
//         await mongoose.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })

//         console.log('MongoDB Connected Successfully!')
//     } catch (error) {
//         console.log(error);
//         console.log("Could not connect with MongoDB");
//     }
// }


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var conn = mongoose.connection;
conn.once('connected', function () {
    console.log('MongoDB Connected Successfully!')
});
conn.on('disconnected', function () {
    console.log('OOps MongoDB is disconnected !!');
})
conn.on('error', console.error.bind(console, 'connection error:'));

//connectDatabase();

module.exports = conn;