import type { User } from '@/payload-types';
import type { FieldHook } from 'payload';

export const protectedRoles: FieldHook<{ id: string } & User> = ({
	req,
	value,
	originalDoc,
}) => {
	const isAdmin = req.user?.roles?.includes('admin');

	if (!isAdmin) {
		return originalDoc?.roles ?? ['user'];
	}

	const userRoles = new Set(value || []);
	userRoles.add('user');

	return [...userRoles.values()];
};
