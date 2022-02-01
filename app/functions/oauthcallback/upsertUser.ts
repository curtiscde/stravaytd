import { db } from '../../firebase/admin';
import { encrypt } from './encrypt';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';

async function deleteExistingUserDocs(id: number) {
  return await db
    .collection('users')
    .where('id', '==', id)
    .get()
    .then(data => {
      data.forEach(doc => doc.ref.delete())
    })
}

async function addUser(authData: IOAuthTokenResponse) {
  return await db
    .collection('users')
    .add({ id: authData.athlete.id, token: encrypt(authData.refresh_token) })
    .then(() => console.log('user added'))
    .catch((e) => { throw new Error(e) });
}

export async function upsertUser(authData: IOAuthTokenResponse) {
  await deleteExistingUserDocs(authData.athlete.id);
  return await addUser(authData);
}