import { JwtUserPayload } from "./jwt.type";

declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}
