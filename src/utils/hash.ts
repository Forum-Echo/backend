import crypto from 'crypto';

export class Hash {
  hashPassword(password) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(password))
      .digest('hex');
  }
}
