/* eslint-disable no-console */
import { db } from '../../firebase/admin';
import { encrypt } from './encrypt';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';

async function deleteExistingUserDocs(id: number) {
  return db
    .collection('users')
    .where('id', '==', id)
    .get()
    .then((data) => {
      data.forEach((doc) => doc.ref.delete());
    });
}

async function addUser(authData: IOAuthTokenResponse) {
  return db
    .collection('users')
    .add({
      id: authData.athlete.id,
      token: encrypt(authData.refresh_token),
      dateAdded: new Date(),
    })
    .then(() => console.log('user added'))
    .catch((e) => { throw new Error(e); });
}

export async function upsertUser(authData: IOAuthTokenResponse) {
  await deleteExistingUserDocs(authData.athlete.id);
  return addUser(authData);
}
