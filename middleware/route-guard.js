const loggedIn = (req, res, next) => {
    if(!req.session.currentUser) {
        return res.redirect('/login')
    };
    next();
};

const loggedOut = (req, res, next) => {
    if(req.session.currentUser) {
        return res.redirect('/login/user')
    };
    next();
};

module.exports = {loggedIn, loggedOut};