import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const sessionSchema = new Schema ({
    cookieID: {
        type: String,
        required: true
    },
});

const Session = mongoose.model('session', sessionSchema);
export default Session;