import * as crypto from 'crypto';

export const hashedPassword = (password: string) => {
	return crypto.createHash('sha512').update(password).digest('base64');
};
