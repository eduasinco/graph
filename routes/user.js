const express = require('express');
const router = express.Router()
const {User, ROLE} = require('../src/user/data')
const bcrypt = require('bcrypt')
const auth = require("../auth");
const settings = require("../settings");


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, "firstName lastName email password", (err, user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.send({
                error: "Incorrect email / password.",
            });
        }
        auth.createUserSession(req, res, user);
        res.status(200).json({data : user});
    });
});

router.post("/register",  (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
    let user = new User(req.body);
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

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.reset();
    }
    res.send("Logged out");
});

router.get('/users', auth.loginRequired, (req, res) => {
    User.find({}).then(users => {
        res.status(200).json({data: users});
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

router.get('/:id', auth.loginRequired, (req, res) => {
    User.findById(req.params.id).then(user => {
        res.status(200).json({data: user});
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
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