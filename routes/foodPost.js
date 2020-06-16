const express = require('express');
const router = express.Router()
const FoodPost = require('../src/foodPost/data')
const {ROLE} = require('../src/user/data')
const auth = require("../auth");


router.get('/foods', (req, res) => {
    FoodPost.find({}).then(users => {
        res.status(200).json({data: users});
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

module.exports = router
