const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const BodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./db');  // Assuming this initializes your MongoDB connection
const isAuthenticated=require("./middlewares/auth");
const UserRoute = require('./routes/UserRoutes');
const PostsRoute = require('./routes/postRoutes');

// Middleware to parse JSON and cookies
app.use(BodyParser.json());
app.use(cookieParser());

// Static file serving
app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true })); // To parse form data

// Session middleware should be declared before routes
app.use(session({
    secret: 'your_secret_key',  // Use a strong secret key for production
    resave: false,              // Session won't be saved unless modified
    saveUninitialized: false,   // Won't create session unless initialized
    cookie: { secure: false }   // Set to true in production with HTTPS
}));

// Routes
app.use('/user', UserRoute);
app.use('/posts',isAuthenticated,PostsRoute);

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'home.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
