import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'
import { checkRole } from './checkRole'

const editorAccess = ({ req: { user } }: AccessArgs<User>): boolean => {
  if (user) {
    return checkRole(['admin', 'editor'], user)
  }

  return false
}

export default editorAccess
