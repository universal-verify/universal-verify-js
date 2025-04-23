import { AUTH_URL } from './constants.js';

class UniversalVerify {
    constructor(clientId) {
        if (!clientId || typeof clientId !== 'string') throw new Error('clientId is required');
        this.clientId = clientId;
    }

    /**
     * Creates an OAuth authorization URL
     * @param {Object} options - Options for the authorization URL
     * @param {string} options.codeChallenge - The code challenge for the OAuth flow
     * @param {string} options.redirectUrl - The redirect URL for the OAuth flow
     * @param {string} options.state - The state for the OAuth flow
     * @param {string} options.nonce - The nonce for the OAuth flow
     * @param {string} [options.scope='verification openid age ...'] - The OAuth scope
     * @returns {string} The complete authorization URL
     */
    createAuthorizationUrl(options = {}) {
        if (!options.codeChallenge || typeof options.codeChallenge !== 'string')
            throw new Error('codeChallenge is required');
        let params = { client_id: this.clientId, code_challenge: options.codeChallenge };
        if (options.redirectUrl) params.redirect_uri = options.redirectUrl;
        if (options.scope) params.scope = options.scope;
        if (options.state) params.state = options.state;
        if (options.nonce) params.nonce = options.nonce;

        params = new URLSearchParams(params);

        return `${AUTH_URL}?${params.toString()}`;
    }

    /**
     * Parses the OAuth redirect URL and extracts parameters
     * @returns {Object} The parsed parameters
     */
    parseRedirectUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            code: urlParams.get('code'),
            state: urlParams.get('state'),
            //error: urlParams.get('error'),
            //error_description: urlParams.get('error_description'),
        };
        
        return params;
    }

    /**
     * Returns the version of the UniversalVerify library
     * @returns {string} The version of the UniversalVerify library
     */
    static get version() { return '0.0.1'; }
}

export default UniversalVerify;
