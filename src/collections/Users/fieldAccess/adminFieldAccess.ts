import type { FieldAccess } from 'payload'
import { checkRole } from '../access/checkRole'

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
	if (user) {
		return checkRole(['admin'], user)
	}

	return false
}
