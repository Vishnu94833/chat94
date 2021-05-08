exports = function ConnectDB() {

    console.log("in");
    //Set up default mongoose connection

    let mongoDB = 'mongodb+srv://Vishnu94833:WGZ2VelktA5ql7wJ@cluster0.imkz5.mongodb.net/<dbname>?retryWrites=true&w=majority';
    mongoose.connect(mongoDB);
    // let db = mongoose.connection;
    mongoose.connection.on('open', function () {
        console.log(console, 'Successful:')
    });

    mongoose.connection.on('error', function () {
        console.error.bind(console, 'MongoDB connection error:')
    });
}