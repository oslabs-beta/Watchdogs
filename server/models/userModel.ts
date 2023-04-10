import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

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
    ARN: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        return next();
    })
})

userSchema.methods.comparePassword = async function(unhashed) {
    const matching = await bcrypt.compare(unhashed, this.password);
    return matching;
}

const User = mongoose.model('Users', userSchema);
module.exports = User;
