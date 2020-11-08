import mongoose, { Connection } from "mongoose";

// Connects to the database set up on the virtual machine
export function connect() : void {
    const connectionString : string = "mongodb://localhost/moviedb?gssapiServiceName=mongodb";
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(_ => console.log("Database conntected!"));
}

export let db : Connection = mongoose.connection;

