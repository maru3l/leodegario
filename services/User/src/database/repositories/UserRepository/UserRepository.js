function reduceMongoResponse({_id: id, ...data}) {
  return {
    id,
    ...data,
  };
}

export default function buildUserRepository({db}) {
  async function insert({id, ...data}) {
    const {acknowledged} = await db
      .collection('users')
      .insertOne({_id: id, ...data});

    if (!acknowledged) throw new Error('Error inserting user');

    return acknowledged;
  }

  async function findAll() {
    const users = await db.collection('users').find().toArray();

    return users.map(reduceMongoResponse);
  }

  async function findById(id) {
    if (!id) throw new Error('User id is required');

    const user = await db.collection('users').findOne({_id: id});

    if (!user) return null;

    return reduceMongoResponse(user);
  }

  async function findByEmail(email) {
    if (!email) throw new Error('User email is required');

    const user = await db.collection('users').findOne({email});

    if (!user) return null;

    return reduceMongoResponse(user);
  }

  async function update(id, changes = {}) {
    if (!id) throw new Error('User id is required');

    const {modifiedCount, matchedCount} = await db
      .collection('users')
      .updateOne({_id: id}, {$set: changes});

    if (matchedCount < 1) throw new Error('User not found');

    if (modifiedCount < 1) throw new Error('Error updating user');

    return modifiedCount > 0;
  }

  async function remove(id) {
    if (!id) throw new Error('User id is required');

    const {acknowledged, deletedCount} = await db
      .collection('users')
      .deleteOne({_id: id});

    if (deletedCount < 1) throw new Error('Error removing user');

    return acknowledged;
  }

  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    insert,
    update,
    remove,
  });
}
