import { verifyToken } from '../utils/verify_token';
import jwt from 'jsonwebtoken';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

describe("Function verifyToken", () => {
    test("it should fail with no token in the header", () => {
        const input: [Request, Response, NextFunction] = [
            mockRequest(),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = `No JWT token - access denied.`;
        expect(verifyToken(...input)).toEqual(output);
    });
    test("it should fail with bad token in the header", () => {
        const input: [Request, Response, NextFunction] = [
            mockRequest({ header: () => 'bad token' }),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = {
            name: 'JsonWebTokenError',
            message: 'jwt malformed'
        };
        expect(verifyToken(...input)).toEqual(output);
    });
    test("it should return next middleware with good token in the header", () => {
        const input: [Request, Response, NextFunction] = [
            mockRequest({ header: () => jwt.sign({ username: 'some username' }, process.env.SECRET_KEY) }),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = 'fired next middleware';
        expect(verifyToken(...input)).toEqual(output);
    });
});