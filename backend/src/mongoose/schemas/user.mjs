import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    contactNo: {
        type: String,
        require: true,
        unique: true,
        length: 10,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 255,
    },
    gender: {
        type: String,
        require: true,
    },
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        require: true
    },
    role: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },

})

export const user = mongoose.model('user', userSchema);