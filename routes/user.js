const express = require('express');
const router = express.Router()
const {User, ROLE} = require('../src/user/data')
const bcrypt = require('bcrypt')
const auth = require("../auth");
const settings = require("../settings");
const nodemailer = require('nodemailer');
const {email, password} = require('../config');
const upload = require('../uploads/upload')

router.post("/register", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
    let user = new User(req.body);
    user.password = req.body.password
    user
        .save()
        .then(result => {
            auth.createUserSession(req, res, user);
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/login", (req, res) => {
    User.findOne({email: req.body.email}, "firstName lastName email password", (err, user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.send({
                error: "Incorrect email / password.",
            });
        }
        auth.createUserSession(req, res, user);
        res.status(200).json({data: user});
    });
});

router.get("/send_new_password/:email", (req, res) => {
    User.findOne({email: req.body.email}, "firstName lastName email password", (err, user) => {
        if (!user) {
            return res.json({
                "error_message": "User with this email does not exist",
            });
        }
        // TODO make a random text for the password
        user.password = bcrypt.hashSync("RANDOM_TEXT", settings.BCRYPT_WORK_FACTOR)
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
});

function sendCodeEmail(req, res, verification_n) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    const mailOptions = {
        from: email,
        to: req.params.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!' + verification_n
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).json({error: error});
        } else {
            res.status(201).json({"message": "Verification number sent"});
        }
    });
}

router.get("/send_code_to_email/:email", (req, res) => {
    // TODO make a random verification_n
    User.findOne({email: req.params.email}, (err, user) => {
        const verification_n = 111111
        user.verification_n = verification_n
        user.save()
            .then(result => {
                sendCodeEmail(req, res, verification_n)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    });
});

router.get("/send_verification_code/:email/:code", (req, res) => {
    // TODO make a random verification_n
    User.findOne({email: req.params.email}, (err, user) => {
        if (user.verification_n === code) {
            user.is_active = true
            user.save()
                .then(result => {
                    res.status(201).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
        } else {
            res.status(401).json({"error_message": "Wrong verification code"});
        }
    });
});

router.post("/is_code_valid", (req, res) => {
    if (req.user.verification_n === req.body.code) {
        req.user.email = req.data["new_email"]
        req.user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(400).json({"error_message": "Wrong validation code"});
    }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.reset();
    }
    res.send("Logged out");
});

router.get('/profiles', auth.loginRequired, (req, res) => {
    User.find({}).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

router.get('/profile_detail/:id', auth.loginRequired, (req, res) => {
    User.findById(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

router.get('/edit_profile',
    auth.loginRequired,
    upload,
    (req, res) => {
    User.findOneAndUpdate({"_id": req.user.id},
        {"$set":
                {...req.body,
                    profile_image: req.files.profile_image ? req.files.profile_image[0].path: "",
                    background_image: req.files.background_image ? req.files.background_image[0].path: ""
                }
        })
        .exec((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });
})

router.get('/delete_user_images/:profile', auth.loginRequired, (req, res) => {
    User.findOneAndUpdate({"_id": req.user.id}, {"$set": req.body}).exec((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });
})

router.post("/change_password", auth.loginRequired, (req, res) => {
    if (!req.user || !bcrypt.compareSync(req.body.password, req.user.password)) {
        return res.send({
            error: "Incorrect old password.",
        });
    } else {
        req.user.password = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
        req.user
            .save()
            .then(result => {
                auth.createUserSession(req, res, user);
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /products",
                    createdProduct: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.get("/send_new_password/:email", auth.loginRequired, (req, res) => {
    const email = res.params.email
});


module.exports = router