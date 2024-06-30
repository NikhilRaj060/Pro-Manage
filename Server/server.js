const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db.js');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use("/auth/v1", authRoutes);
app.use("/api/v1", taskRoutes);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../Client/build")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/build", "index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
const PORT = process.env.PORT || 3002;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error while server is getting up", error);
});
