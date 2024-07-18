import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    deptName: {
        type: String,
        required: true,
        unique: true,
    },
    createdate: {
        type: Date,
        default: Date.now,
    },
});

export const dept = mongoose.model('department', departmentSchema);