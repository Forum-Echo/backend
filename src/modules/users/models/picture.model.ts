import * as mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema({
    buffer: { type: Object, required: true },
    filename: { type: String, required: true },
    userId: { type: String, required: true },
});

export interface Picture {
    buffer: object;
    filename: string;
    userId: string;
}
