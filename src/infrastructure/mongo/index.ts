import { connect, connection, Document, Model, model, Types, Schema, Query } from "mongoose"

const mongoString = "mongodb+srv://cleanArchiPokeUser:2gGdAgdJzlmzyLfX@cluster0.hdlrr.mongodb.net/pokemonDb?retryWrites=true&w=majority"

connect(mongoString, { useNewUrlParser: true })

connection.on("error", function (error) {
    console.log(`Error connecting to mongo: ${error}`)
})

connection.on("open", function () {
    console.log("Connected to MongoDB database.")
})