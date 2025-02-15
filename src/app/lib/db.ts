import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {

    const isConnected = mongoose.connection.readyState;

    if (isConnected === 1) {
        return;
    }

    try {
        await mongoose.connect(MONGO_URI!, {
            dbName: "learnNext",
            bufferCommands: false
        })
        console.log("Connected to MongoDB");
    }catch (e) {    
        console.error(e);
    }
}

export default connect;