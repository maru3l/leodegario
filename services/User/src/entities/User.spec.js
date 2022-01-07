import faker from 'faker';
import generateId from '../utils/generateId';
import ValidationError from '../utils/Validation/ValidationError';

import User from './User';

describe('User Entity', () => {
  describe('Create user', () => {
    it('Should return user object when creating a new user with all params', () => {
      const userObject = {
        id: generateId(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const user = new User(userObject);

      expect(user.id).toBe(userObject.id);
      expect(user.firstName).toBe(userObject.firstName);
      expect(user.lastName).toBe(userObject.lastName);
      expect(user.email).toBe(userObject.email);
      expect(user.createdAt).toBe(userObject.createdAt);
      expect(user.updatedAt).toBe(userObject.updatedAt);
    });

    it('Should return user object when creating a new user without id', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const user = new User(userObject);

      expect(user.id).toMatch(/^.{24}$/);
      expect(user.firstName).toBe(userObject.firstName);
      expect(user.lastName).toBe(userObject.lastName);
      expect(user.email).toBe(userObject.email);
      expect(user.createdAt).toBe(userObject.createdAt);
      expect(user.updatedAt).toBe(userObject.updatedAt);
    });

    it('Should return user object when creating a new user without id, createdAt and updatedAt', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };

      const user = new User(userObject);

      expect(user.id).toMatch(/^.{24}$/);
      expect(user.firstName).toBe(userObject.firstName);
      expect(user.lastName).toBe(userObject.lastName);
      expect(user.email).toBe(userObject.email);
      expect(user.createdAt).toMatch(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
      );
      expect(user.updatedAt).toMatch(
        /^^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
      );
    });

    it('Should return an error when creating a new user with an to short id length', () => {
      const userObject = {
        id: faker.random.alphaNumeric(12),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an to long id length', () => {
      const userObject = {
        id: faker.random.alphaNumeric(48),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an not ISO createdAt date format', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date().toUTCString(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an timestamps at createdAt', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: Date.now(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an Date object at createdAt', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an not ISO updatedAt date format', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date().toUTCString(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an timestamps at updatedAt', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: Date.now(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an Date object at updatedAt', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user without first name', () => {
      const userObject = {
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with a integer in first name', () => {
      const userObject = {
        firstName: faker.datatype.number(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user without last name', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with a integer in last name', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.datatype.number(),
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user without first name and last name', () => {
      const userObject = {
        email: faker.internet.email(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user without email address', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an invalid email address', () => {
      const userObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.url(),
      };

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user with an empty object', () => {
      const userObject = {};

      const fn = () => new User(userObject);

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });

    it('Should return an error when creating a new user without object', () => {
      const fn = () => new User();

      const error = new ValidationError({errors: []});

      expect(fn).toThrowError(error);
    });
  });
});
