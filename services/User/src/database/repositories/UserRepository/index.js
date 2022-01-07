import dbo from '../../conn';
import buildUserRepository from './UserRepository';

const db = dbo.getDb();

const UserRepository = buildUserRepository({db});

export default UserRepository;
