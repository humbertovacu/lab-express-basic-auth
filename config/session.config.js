const MongoStore = require('connect-mongo');
const session = require('express-session');

module.exports = app => {
    app.set('trust proxy', 1);
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/lab-express-basic-auth",
                ttl: 60 * 60 * 48
            })
        })
    );
};