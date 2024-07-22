import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true,
        unique: true,
    },
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