const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "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\n" +
    "-----END RSA PRIVATE KEY-----";
const saltRounds = 10;
router.use(function(req, res, next) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.hashedPassword = hash;
            next();
        });
    });
})

//register

router.post("/register", async function (req, res, next) {
    if (req.body.username && req.body.password && req.body.passwordConfirmation) {
        if (req.body.password === req.body.passwordConfirmation) {
            const user = new User({
                username: req.body.username,
                password: req.hashedPassword,
            });
            return await user
                .save()
                .then((savedUser) => {
                    return res.status(201).json({
                        id: savedUser._id,
                        username: savedUser.username,
                    });
                })
                .catch((error) => {
                    return res.status(500).json({ error: error.message });
                });
        }
        res.status(400).json({ error: "Passwords not matching" });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});

//login

router.post("/login", async function (req, res, next) {
    if (req.body.username && req.body.password) {
        const user = await User.findOne()
            .where("username")
            .equals(req.body.username)
            .exec();
        if (user) {
            return bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result === true) {
                        const token = jwt.sign({ id: user._id }, privateKey, {
                            algorithm: "RS256",
                        });
                        return res.status(200).json({ access_token: token });
                    } else {
                        return res.status(401).json({ error: "Invalid credentials." });
                    }
                })
                .catch((error) => {
                    return res.status(500).json({ error: error.message });
                });
        }
        return res.status(401).json({ error: "Invalid credentials." });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});


module.exports = router;



