import dotenv from 'dotenv';
import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";

// Ép kiểu để chắc chắn JWT_SECRET là Secret
// const JWT_SECRET = (process.env.JWT_SECRET ?? 'your-secret-key') as Secret;

export interface MyJwtPayload extends JwtPayload {
    id: number | null;
    role?: string;
}

// const signOptions: SignOptions = {
//     expiresIn: '1000h',
// };

// Tạo token
// export function generateToken(payload: MyJwtPayload, signOptions: SignOptions): string {
//     const cp_signOptions = {...signOptions} 
//     cp_signOptions.algorithm = 'RS256'
//     return jwt.sign(payload as object, JWT_SECRET as Secret, cp_signOptions);
// }
export function generateAccessToken(payload: MyJwtPayload, signOptions: SignOptions): string {
    const cp_signOptions = {...signOptions} 
    cp_signOptions.algorithm = 'HS256'
    return jwt.sign(payload as object, ACCESS_TOKEN_SECRET as Secret, cp_signOptions);
}
export function generateRefreshToken(payload: MyJwtPayload, signOptions: SignOptions): string {
    const cp_signOptions = {...signOptions} 
    cp_signOptions.algorithm = 'HS256'
    return jwt.sign(payload as object, REFRESH_TOKEN_SECRET as Secret, cp_signOptions);
}

// Xác minh token
// export function verifyToken(token: string): MyJwtPayload | null {
//     try {
//         return jwt.verify(token, JWT_SECRET) as MyJwtPayload;
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         return null;
//     }
// }
export function verifyAccessToken(token: string): MyJwtPayload | null {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as MyJwtPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export function verifyRefreshToken(token: string): MyJwtPayload | null {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as MyJwtPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

