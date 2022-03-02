import { db } from '../../firebase/admin';

export async function getToken(id: number) {
  return db
    .collection('users')
    .where('id', '==', id)
    .limit(1)
    .get()
    .then((data) => data.docs[0].get('token'));
}
