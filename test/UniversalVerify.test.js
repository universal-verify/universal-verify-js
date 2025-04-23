import { test, describe } from 'node:test';
import assert from 'node:assert';
import UniversalVerify from '../scripts/UniversalVerify.js';
import { AUTH_URL } from '../scripts/constants.js';

describe('UniversalVerify', () => {
    test('constructor throws error if clientId is not provided', () => {
        assert.throws(() => new UniversalVerify(), {
            message: 'clientId is required'
        });
    });

    test('constructor throws error if clientId is not a string', () => {
        assert.throws(() => new UniversalVerify(123), {
            message: 'clientId is required'
        });
    });

    test('constructor initializes with valid clientId', () => {
        const universalVerify = new UniversalVerify('test-client-id');
        assert.strictEqual(universalVerify.clientId, 'test-client-id');
    });

    test('createAuthorizationUrl throws error if codeChallenge is not provided', () => {
        const universalVerify = new UniversalVerify('test-client-id');
        assert.throws(() => universalVerify.createAuthorizationUrl({}), {
            message: 'codeChallenge is required'
        });
    });

    test('createAuthorizationUrl creates valid URL with all parameters', () => {
        const universalVerify = new UniversalVerify('test-client-id');
        const options = {
            codeChallenge: 'test-code-challenge',
            redirectUrl: 'https://example.com/callback',
            state: 'test-state',
            nonce: 'test-nonce',
            scope: 'verification openid age'
        };

        const url = universalVerify.createAuthorizationUrl(options);
        const urlObj = new URL(url);

        assert.strictEqual(urlObj.origin + urlObj.pathname, AUTH_URL);
        assert.strictEqual(urlObj.searchParams.get('client_id'), 'test-client-id');
        assert.strictEqual(urlObj.searchParams.get('code_challenge'), 'test-code-challenge');
        assert.strictEqual(urlObj.searchParams.get('redirect_uri'), 'https://example.com/callback');
        assert.strictEqual(urlObj.searchParams.get('state'), 'test-state');
        assert.strictEqual(urlObj.searchParams.get('nonce'), 'test-nonce');
        assert.strictEqual(urlObj.searchParams.get('scope'), 'verification openid age');
    });

    test('createAuthorizationUrl creates valid URL with only required parameters', () => {
        const universalVerify = new UniversalVerify('test-client-id');
        const options = {
            codeChallenge: 'test-code-challenge'
        };

        const url = universalVerify.createAuthorizationUrl(options);
        const urlObj = new URL(url);

        assert.strictEqual(urlObj.origin + urlObj.pathname, AUTH_URL);
        assert.strictEqual(urlObj.searchParams.get('client_id'), 'test-client-id');
        assert.strictEqual(urlObj.searchParams.get('code_challenge'), 'test-code-challenge');
        assert.strictEqual(urlObj.searchParams.has('redirect_uri'), false);
        assert.strictEqual(urlObj.searchParams.has('state'), false);
        assert.strictEqual(urlObj.searchParams.has('nonce'), false);
        assert.strictEqual(urlObj.searchParams.has('scope'), false);
    });

    test('version returns correct version', () => {
        assert.strictEqual(UniversalVerify.version, '0.0.1');
    });
}); 