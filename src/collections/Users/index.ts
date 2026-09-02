import type { CollectionConfig } from 'payload';

import { adminAccess } from '@/access/adminAccess';
import { authenticated } from '@/access/authenticated';
import userAccess from './access/userAccess';
import { adminFieldAccess } from './fieldAccess/adminFieldAccess';
import { protectedRoles } from './hooks/protectRoles';

export const Users: CollectionConfig = {
	slug: 'users',
	access: {
		admin: authenticated,
		create: adminAccess,
		delete: adminAccess,
		read: userAccess,
		update: userAccess,
	},
	admin: {
		defaultColumns: ['name', 'email'],
		useAsTitle: 'name',
	},
	auth: true,
	fields: [
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'roles',
			type: 'select',
			hasMany: true,
			saveToJWT: true,
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'Editor', value: 'editor' },
				{ label: 'User', value: 'user' },
			],
			access: {
				update: adminFieldAccess,
			},
			hooks: {
				beforeChange: [protectedRoles],
			},
		},
	],
	timestamps: true,
};
