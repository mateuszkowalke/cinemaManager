export { }

declare global {
    namespace Express {
        interface Request {
            username?: unknown;
        }
    }
}