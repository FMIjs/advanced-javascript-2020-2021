const mongodb = require('mongodb');
const { getDb } = require('./index');

function handleQuery(collectionName, op, ...rest) {
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.collection(collectionName)[op](...rest, function (err, result) {
      if (err) { reject(err); return; }

      if (typeof result.toArray === 'function') {
        result.toArray().then(resolve).catch(reject);
        return;
      }
      if (result.ops) {
        const result = result.ops[0];
        resolve(result);
        return
      }
      if (result.value) {
        resolve(result.value);
        return;
      }
      if (result.result.ok === 1) {
        resolve();
        return;
      }

      reject(new Error('Unhandled db result!'));
    });
  });
}

function fixQueryObjectId(query) {
  if (query._id && !(query._id instanceof mongodb.ObjectId)) {
    query._id = mongodb.ObjectId(query._id);
  }
  return query;
}

function fixUpdatedData(data) {
  if (!data['$set']) {
    return { $set: { ...data } };
  }
  return data;
}

module.exports.createQueriesForCollection = function (collectionName) {
  const insert = function (item) {
    return handleQuery(collectionName, 'insert', item);
  };

  const get = function (query) {
    query = fixQueryObjectId(query);
    return handleQuery(collectionName, 'find', query);
  };

  const remove = function (query) {
    query = fixQueryObjectId(query);
    return handleQuery(collectionName, 'findOneAndDelete', query);
  }

  const update = function (query, updatedData) {
    query = fixQueryObjectId(query);
    updatedData = fixUpdatedData(updatedData);
    return handleQuery(collectionName, 'findOneAndUpdate', query, updatedData, { returnNewDocument: true });
  }

  return {
    insert,
    get,
    remove,
    update
  }
};

