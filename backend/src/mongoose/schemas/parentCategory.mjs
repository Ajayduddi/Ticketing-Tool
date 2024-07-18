import mongoose from 'mongoose';

const parentCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'department',
        required: true,
    },
});

export const parentCategory = mongoose.model('parentCategory', parentCategorySchema);