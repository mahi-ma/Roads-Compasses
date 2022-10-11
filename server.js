import express from "express";
import cors from "cors";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import filterTagRouter from "./routes/filterTag.routes.js";
import postTagRouter from "./routes/postTag.routes.js";
import models from "./models/index.js"

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = models;
db.sequelize.sync()
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

// app.use("/posts",postRouter);
app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.use("/filerTag",filterTagRouter);
app.use("/postTag",postTagRouter);

postRouter(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "App for hodophiles" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
