import generateId from '../utils/generateId';
import createValidate from '../utils/Validation';

export const validationSchema = {
  type: 'object',
  properties: {
    id: {type: 'string', minLength: 24, maxLength: 24},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string', format: 'email'},
    createdAt: {type: 'string', format: 'date-time'},
    updatedAt: {type: 'string', format: 'date-time'},
  },
  required: ['firstName', 'lastName', 'email'],
};

const validate = createValidate(validationSchema);

export default class User {
  constructor(data = {}) {
    validate(data);

    this._id = data.id || generateId();
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._createdAt = data.createdAt || new Date().toISOString();
    this._updatedAt = data.updatedAt || new Date().toISOString();
  }

  get firstName() {
    return this._firstName;
  }

  get id() {
    return this._id;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}
