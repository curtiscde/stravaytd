import { encrypt } from './encrypt';

jest.mock('crypto', () => ({
  randomBytes: () => Buffer.from('baz'),
  createCipheriv: jest.fn(() => ({
    update: () => Buffer.from('foo'),
    final: () => Buffer.from('bar'),
  })),
}));

describe('encrypt', () => {
  let response: string;

  beforeAll(() => {
    process.env.CIPHERKEY = 'max0JlB2pZ0o3TQNKkq1lExVEvYDyelt';
    response = encrypt('foo');
  });

  it('returns string', () => {
    expect(response).toEqual('62617a:666f6f626172');
  });
});
