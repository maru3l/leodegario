import faker from 'faker';
import generateId from '../../../utils/generateId';
import dbo from '../../conn';
import buildUserRepository from './UserRepository';

function generateUserObject(values = {}) {
  return {
    id: values.id || generateId(),
    firstName: values.firstName || faker.name.firstName(),
    lastName: values.lastName || faker.name.lastName(),
    email: values.email || faker.internet.email(),
    createdAt: values.createdAt || new Date().toISOString(),
    updatedAt: values.updatedAt || new Date().toISOString(),
  };
}

describe('User repository', () => {
  let UserRepository;
  let db;

  beforeAll(async () => {
    await dbo.connectToServer();

    db = dbo.getDb('user_service_test_db');

    UserRepository = buildUserRepository({db});
  });

  afterAll(async () => {
    await db.dropDatabase();

    dbo.close();
  });

  describe('Insert user', () => {
    it('Should insert user without error and returning true', async () => {
      const userObject = generateUserObject();

      const response = await UserRepository.insert(userObject);

      expect(response).toBe(true);
    });
  });

  describe('Find user by email', () => {
    it('Should return same user then the one added when try to find user by email', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const user = await UserRepository.findByEmail(userObject.email);

      expect(user).toMatchObject(userObject);
    });

    it("Should return null when try to find user who doesn't exist", async () => {
      const user = await UserRepository.findByEmail(faker.internet.email());

      expect(user).toBe(null);
    });

    it('Should throw an error when try to find user without an email address', async () => {
      const fn = async () => UserRepository.findByEmail();

      await expect(fn).rejects.toThrowError('User email is required');
    });
  });

  describe('Find user by id', () => {
    it('Should return same user then the one added when try to find user by id', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const user = await UserRepository.findById(userObject.id);

      expect(user).toMatchObject(userObject);
    });

    it("Should return null when try to find user by id who doesn't exist", async () => {
      const user = await UserRepository.findById(generateId());

      expect(user).toBe(null);
    });

    it('Should throw an error when try to find user without an ID', async () => {
      const fn = async () => UserRepository.findById();

      await expect(fn).rejects.toThrowError('User id is required');
    });
  });

  describe('Find all user', () => {
    it('Should return all users added', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const users = await UserRepository.findAll();

      expect(users).toContainEqual(userObject);
    });
  });

  describe('Update user', () => {
    it('Should update user and returning true', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const updatedUserObject = {
        ...userObject,
        firstName: faker.name.firstName(),
      };

      const response = await UserRepository.update(userObject.id, {
        firstName: updatedUserObject.firstName,
      });

      expect(response).toBe(true);

      const user = await UserRepository.findById(userObject.id);

      expect(user).toEqual(updatedUserObject);
    });

    it('Should throw an error if no id is passed', async () => {
      const fn = async () => UserRepository.update();

      await expect(fn).rejects.toThrowError('User id is required');
    });

    it('Should throw an error if the user does not exist', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const fn = async () => UserRepository.update(generateId());

      await expect(fn).rejects.toThrowError('User not found');
    });
  });

  describe('Remove user', () => {
    it('Should remove user without error and returning true', async () => {
      const userObject = generateUserObject();

      await UserRepository.insert(userObject);

      const response = await UserRepository.remove(userObject.id);

      expect(response).toBe(true);

      const user = await UserRepository.findById(userObject.id);

      expect(user).toBe(null);
    });

    it('Should throw an error if the user does not exist', async () => {
      const fn = async () => UserRepository.remove(generateId());

      await expect(fn).rejects.toThrowError('Error removing user');
    });

    it('Should throw an error if no id is passed', async () => {
      const fn = async () => UserRepository.remove();

      await expect(fn).rejects.toThrowError('User id is required');
    });
  });
});
