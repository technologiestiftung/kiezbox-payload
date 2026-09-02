import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['roles'] = [], user: User): boolean => {
  if (user) {
    return (
      allRoles?.some((role) => user?.roles?.some((individualRole) => individualRole === role)) ??
      false
    )
  }

  return false
}
