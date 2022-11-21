const User = require('../models/User.model');

const router = require('express').Router();

const bcrypt = require('bcryptjs');

router.get('/', (req, res)=> {
    res.render('login')
})



router.post('/', async (req, res) => {
    console.log('SESSION:', req.session)
    const { userData, password } = req.body;
    const findUser = () => userData.includes('@') ? User.findOne({ email:userData }) : User.findOne({ username:userData })
    await findUser()
    .then (foundUser => {
        if(!foundUser) {
            res.render('login', {erorMessage: "User not registered"})
        }
        else if(bcrypt.compareSync(password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect('/login/user')
            
        }
        else {
            res.render('login', {errorMessage : 'Incorrect password'})
        };
    }) .catch (err => res.send(err));

    if(userData === "" || password === ""){
        res.render('login', {errorMessage: 'Please enter both valid email/username and password'})
    }
    
})

router.get('/user', (req, res) => {
    res.render('user', { userInSession: req.session.currentUser});
})





module.exports = router;