import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

// Using the schema to make TS Type
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>('Note', noteSchema);
