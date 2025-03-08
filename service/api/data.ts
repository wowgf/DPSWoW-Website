import request from '../request'

export function getUserData(userId: any): Promise<{ requirementTotal: number, offeringTotal: number, artisanAbilityTotal: number }> {
  return request.get('/open/data/user/userData', { params: { userId } })
}