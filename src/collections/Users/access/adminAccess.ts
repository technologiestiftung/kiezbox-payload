import type { User } from '@/payload-types';
import type { AccessArgs } from 'payload';
import { checkRole } from './checkRole';

const adminAccess = ({ req: { user } }: AccessArgs<User>): boolean => {
	if (user) {
		return checkRole(['admin'], user);
	}

	return false;
};

export default adminAccess;
