const router = require('express').Router();
let User = require('../models/user.model');
let Message = require('../models/messages.model');

//find all users
router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

//add a user
//password is encrypted going to the database
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username,
        password
    });

    newUser.save().then(() => res.json('User added')).catch(err => res.status(400).json(`Error: ${err}`));
});

//delete user and user's messages
router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    User.findOne({_id: id}, function(err, foundUser){
        if(err) {
            res.status(500).json(`Error: ${err}`);
        }
        Message.deleteMany({author: foundUser.username}, function(err, result) {
            if(err){
                res.status(500).json(`Error: ${err}`);
            }
        });
        foundUser.deleteOne().then(() => res.json("User and all of the user's messages deleted")).catch(err => res.status(400).json(`Error: ${err}`));
    });
})

//edit user using an id
//if username is edited, the posts created by that user are also edited
router.route('/edit/:id').put((req, res) => {
    let id = req.params.id;
    User.findOne({_id: id}, function(err, foundUser) {
        if(err) {
            console.log(err);
            res.status(500).json(`Error: ${err}`);
        } else {
            if(!foundUser) {
                res.status(404).json(`User with id ${id} not found.`);
            }

            if(req.body.username){
                Message.updateMany({author: foundUser.username}, {author: req.body.username}, function(err, updated) {
                    if (err){
                        res.status(500).json(`Error: ${err}`);
                    }
                });
                foundUser.username = req.body.username;
            }

            if(req.body.password){
                foundUser.password = req.body.password;
            }

            foundUser.save(function(err, updatedUser) {
                if(err){
                    console.log(err)
                    res.status(500).json();
                } else {
                    res.status(200).json({status: "Updated", ...updatedUser._doc});
                }
            })
        }
    });
})

//login user
//returns auth, expiration, and userId
router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({'username': username}, (err, user) => {

        if(err){
            throw err;
        }

        if(user.comparePassword(password)){
            return res.json({
                "token": "this-is-an-auth-key",
                "userId": user.username,
                "Expiration": "Expiration-date"
            })
        } else {
            return res.json({
                "Error": "Wrong password"
            })
        };
    });
});

module.exports = router;