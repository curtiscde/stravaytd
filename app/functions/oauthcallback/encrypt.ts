import crypto from 'crypto'

export function encrypt(message: string) {
  const initVector = crypto.randomBytes(16);
  const cipherkey: string = process.env.CIPHERKEY!;
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(cipherkey), initVector);

  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData = `${encryptedData}${cipher.final("hex")}`;

  return `${initVector.toString('base64')}.${encryptedData}`;
}