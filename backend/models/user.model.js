const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    userId: ObjectId,
    username: {
        type: String,
        required: true,
        createIndexes: {
            unique: true
        },
        minLength: 8,
        maxlength: 23,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minLength: 10,
        maxLength: 20
    }
});

userSchema.methods.comparePassword = function comparePassword(plaintext) {
    return bcrypt.compareSync(plaintext, this.password);
};

//on save, hash password using bcrypt
userSchema.pre("save", function(next) {
    let user = this;

    if(!user.isModified("password")){
        return next();
    }

    try {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        user.password = bcrypt.hashSync(user.password, salt);
        return next();
    } catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model('User', userSchema);

