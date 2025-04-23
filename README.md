# Universal Verify JavaScript SDK

A frontend SDK for integrating with Universal Verify, an OAuth/OIDC platform that enables partners to access user information securely.

## Installation

### NPM

```bash
npm install universal-verify-js
```

## Usage

### Basic Setup

```javascript
import UniversalVerify from 'universal-verify-js';

// Initialize the SDK with your client ID
const universalVerify = new UniversalVerify('your-client-id');
```

### CDN

You can also use the SDK directly from jsDelivr in your ES modules:

```javascript
// In your module file (e.g., app.js)
import UniversalVerify from 'https://cdn.jsdelivr.net/npm/universal-verify-js@0.0.1/build/universal-verify.min.js';

// Then use it as normal
const universalVerify = new UniversalVerify('your-client-id');
```

### OAuth Flow

The SDK supports the OAuth 2.0 Authorization Code flow with PKCE. Here's how to use it:

```javascript
// Generate a code challenge from a code verifier on your backend
const codeChallenge = 'your-code-challenge';

// Create authorization URL
const authUrl = universalVerify.createAuthorizationUrl({
    codeChallenge: codeChallenge, // Required
    redirectUrl: 'https://your-app.com/callback', // Optional (see note in API Reference)
    scope: 'verification openid age ...', // Optional
    state: 'your-state', // Optional
    nonce: 'your-nonce' // Optional
});

// Redirect user to authorization URL
window.location.href = authUrl;

// Parse the redirect URL when the user returns to your redirectUrl
const params = universalVerify.parseRedirectUrl(window.location.href);
```

## API Reference

### Constructor

```javascript
new UniversalVerify(clientId)
```

Creates a new instance of the UniversalVerify SDK.

#### Parameters

- `clientId` (string, required): Your Universal Verify client ID

### Methods

#### createAuthorizationUrl(options)

Creates an OAuth authorization URL.

##### Parameters

- `options` (object):
  - `codeChallenge` (string, required): The code challenge for PKCE
  - `redirectUrl` (string, optional): The redirect URL for the OAuth flow
  - `state` (string, optional): A state parameter for security
  - `nonce` (string, optional): A nonce for security
  - `scope` (string, optional): The OAuth scope. Defaults to 'verification openid age ...'

_redirectUrl must be added to your integration in the partners platform prior to use and is required if more than one has been added_

##### Returns

- `string`: The complete authorization URL

#### parseRedirectUrl()

Parses the OAuth redirect URL and extracts the authorization code and state parameters from the current URL.

##### Returns

- `object`: An object containing:
  - `code` (string): The authorization code
  - `state` (string): The state parameter (if provided)

### Static Properties

#### version

Returns the version of the UniversalVerify library.

```javascript
console.log(UniversalVerify.version); // '0.0.1'
```

## Security Considerations

- Always use PKCE (Proof Key for Code Exchange) for secure OAuth flows
- Implement proper state parameter validation
- Use HTTPS for all communications
- Store sensitive information securely on your backend

## License

MIT License - see [LICENSE](LICENSE) for details
