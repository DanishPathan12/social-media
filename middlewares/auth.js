function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated, redirect or send an error
        res.status(401).send("You must log in to access this page");
    }
}

module.exports=isAuthenticated;