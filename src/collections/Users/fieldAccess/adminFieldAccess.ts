import { checkRole } from '@/access/checkRole';
import type { FieldAccess } from 'payload';

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
	if (user) {
		return checkRole(['admin'], user);
	}

	return false;
};
