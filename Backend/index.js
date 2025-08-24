const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Modules/Database");
const AuthRoutes = require("./Routes/Auth.routes");
const BookRoutes = require("./Routes/Book.routes");





const index = express();
index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cors());

// Routes
index.use('/api/auth', Authroutes); // Login and Registration
index.use('/api', BookRoutes);     // Book API

// Ping route to check server
index.use('/ping', (req, res) => {
    res.status(200).json({ message: "PONG" });
});

const PORT = process.env.PORT || 3000;
index.listen(PORT, () => console.log(`Server running on port ${PORT}`));

