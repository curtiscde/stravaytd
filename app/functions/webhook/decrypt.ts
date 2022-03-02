import crypto from 'crypto';

export function decrypt(token: string): string {
  const textParts = token.split(':');
  const tP2 = textParts.slice(1);
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(tP2.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.CIPHERKEY!), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
