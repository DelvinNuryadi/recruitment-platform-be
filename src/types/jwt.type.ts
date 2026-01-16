export interface JwtUserPayload {
    id: string;
    email: string;
    role: "ADMIN" | "RECRUITER";
    iat?: number;
    exp?: number;
}
