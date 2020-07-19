const router = require('express').Router();

let Message = require('../models/messages.model');

//find all messages
router.route('/').get((req, res) => {
    Message.find().then(messages => res.json(messages)).catch(err => res.status(400).json(`Error: ${err}`));
});

//delete message by ObjectID
router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    Message.findOneAndRemove({'_id': id}).then(() => res.json("Message deleted").catch(err => res.status(400).json(`Error: ${err}`)));
})

//edit message by ID
//edits both message, tags, and author
router.route('/edit/:id').put((req, res) => {
    let id = req.params.id;
    Message.findOne({_id: id}, function(err, foundMessage) {
        if(err) {
            console.log(err);
            res.status(500).json(`Error: ${err}`);
        } else {
            if(!foundMessage) {
                res.status(404).json(`User with id ${id} not found.`);
            }

            if(req.body.author){
                foundMessage.author = req.body.author;
            }

            if(req.body.message){
                foundMessage.message = req.body.message;
            }

            if(req.body.tags){
                foundMessage.tags = req.body.tags;
            }

            foundMessage.save(function(err, updatedMessage) {
                if(err){
                    console.log(err)
                    res.status(500).json();
                } else {
                    res.status(200).json({status: "Updated", ...updatedMessage._doc});
                }
            })
        }
    });
})

//add a message
router.route('/add').post((req, res) => {
    const author = req.body.username;
    const tags = req.body.tags;
    const message = req.body.message;

    const convertTagsToList = tags.split(' ');

    const newMessage = new Message({
        "author": author,
        "tags": convertTagsToList,
        "message":message
    });

    newMessage.save().then(() => res.json('Message added')).catch(err => res.status(400).json(`Error: ${err}`));
});

//search for a message by tags
router.route('/search').post((req, res) => {
    const convertTagsToList = req.body.tags.split(' ');
    Message.find({tags: {$in: convertTagsToList}}).then(messages => res.json(messages)).catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;