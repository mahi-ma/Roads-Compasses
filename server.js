import express from "express";
import cors from "cors";
import postRouter from "./routes/post.routes.js";
import models from "./models/index.js"

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

const db = models;
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/posts",postRouter);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "App for hodophiles" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});