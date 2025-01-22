import jwt from 'jsonwebtoken'

export const seed = 'vive odalys ia'
export const createToken = (payload: any) => jwt.sign(payload, seed)
