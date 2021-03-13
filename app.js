const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require('./routes/user-routes');
app.use(userRoutes);

app.get("/", (req, res) => {

    const response = {
        say: 'hello world'
    }

    res.send(response)
});

const port = process.env.PORT ? process.env.PORT : 6000;

// Error handling on server upstart
app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port", port);
});