import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    arn: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

// Hash the user's password before saving in database
userSchema.pre('save', function (next) {
    
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        return next();
    })
})

const User = mongoose.model('User', userSchema);
export default User;
