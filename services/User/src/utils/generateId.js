import {ObjectId} from 'mongodb';

export default function generateId() {
  return ObjectId().toString();
}
