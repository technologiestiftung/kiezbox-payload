import type { User } from '@/payload-types';
import type { FieldHook } from 'payload';

export const protectedRoles: FieldHook<
	{ id: string } & User,
	User['roles']
> = async ({ req, value, originalDoc, operation }) => {
	const isAdmin = req.user?.roles?.includes('admin');

	if (isAdmin) {
		const userRoles = new Set(value || []);
		userRoles.add('user');

		return [...userRoles.values()];
	}

	if (operation === 'create' && !req.user) {
		const { totalDocs } = await req.payload.count({
			collection: 'users',
			req,
		});

		if (totalDocs === 0) {
			const userRoles = new Set(value || []);
			userRoles.add('admin');
			userRoles.add('user');

			return [...userRoles.values()];
		}
	}

	return originalDoc?.roles ?? ['user'];
};
