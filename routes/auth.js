const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, LoginValidation } = require('../validation')
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword
    });
    console.log(JSON.stringify(user));
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

router.post('/login', async (req, res) => {

    console.log("Loginreq",JSON.stringify(req.body))
    const { error } = LoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does ot exist');

    //validate password

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('password not valid');

    //Create token
    const token = jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET,{ expiresIn: '120s'});
    res.header('auth-token', token).send(token);
    
});

module.exports = router; 