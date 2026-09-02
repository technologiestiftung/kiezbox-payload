import { checkRole } from '@/access/checkRole';
import type { Access } from 'payload';

const userAccess: Access = ({ req: { user } }) => {
	if (user) {
		if (checkRole(['admin', 'editor'], user)) {
			return true;
		}

		return {
			id: { equals: user.id },
		};
	}

	return false;
};

export default userAccess;
