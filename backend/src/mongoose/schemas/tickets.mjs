import mongoose from 'mongoose';
import { parentCategory } from './parentCategory.mjs';
import { childCategory } from './childCategory.mjs';

const ticketSchema = new mongoose.Schema({
    ticketNo: {
        type: String,
        required: true,
        unique: true,
    },
    createdByEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    assignedToEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null,
    },
    contactNo: {
        type: Number,
        length: 10,
        required: true,
    },
    requestDetails: {
        type: String,
        required: true, 
    },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parentCategory',
        required: true,
    },
    childCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'childCategory',
         required: true,
    },
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        required: true,
    },
    severity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'open',
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    expectedEndDate: {
      type: Date,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours = 24 * 60 * 60 * 1000 milliseconds
    },
    completedDate: {
      type: Date,
      default: ''
  }

});

export const ticket = mongoose.model('ticket', ticketSchema);