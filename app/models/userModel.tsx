import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
username: {
type: String,
required: [true, 'Please provide a username'],
unique: true
},
email: {
type: String,
required: [true, 'Please provide an email'],
unique: true
},
password: {
type: String,
required: [true, 'Please provide a password'],
},
isvirefd: {
type: Boolean,
default: false,
},
isAdmin: {
type: Boolean,
default: false,
},
forgotpasswardtoken: String,
forgotpasswardtokenexpiry: Date,
virifeytokien: String,
virifeytokienexpiry: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);  //best practice
// const User = mongoose.model('User', userSchema)!;


export default User
