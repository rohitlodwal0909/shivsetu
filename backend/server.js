require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes");
const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(routes);

db.authenticate()
    .then(() => {
        console.log("DB connected");
        server.listen(process.env.PORT || 5000, () =>
            console.log("Backend server running on port 5000"),
        );
    })
    .catch((err) => console.error("DB connection failed:", err));
