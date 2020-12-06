const verifyToken = require('../utils/verify_token');
const jwt = require('jsonwebtoken');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const dotenv = require("dotenv").config();

describe("Function verifyToken", () => {
    test("it should fail with no token in the header", () => {
        const input = [
            mockRequest(),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = `No JWT token - access denied`;
        expect(verifyToken(...input)).toEqual(output);
    });
    test("it should fail with bad token in the header", () => {
        const input = [
            mockRequest({ header: () => 'bad token' }),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = undefined;
        expect(verifyToken(...input)).toEqual(output);
    });
    test("it should return next middleware with good token in the header", () => {
        const input = [
            mockRequest({ header: () => jwt.sign({ username: 'some username' }, process.env.SECRET_KEY) }),
            mockResponse({ send: (message) => message }),
            () => 'fired next middleware'
        ];
        const output = 'fired next middleware';
        expect(verifyToken(...input)).toEqual(output);
    });
});