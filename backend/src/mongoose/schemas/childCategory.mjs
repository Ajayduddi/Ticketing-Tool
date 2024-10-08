import mongoose from 'mongoose';

const childCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parentCategory',
        required: true
    },
});

export const childCategory = mongoose.model('childCategory', childCategorySchema);