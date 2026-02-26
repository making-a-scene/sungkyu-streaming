import crypto from 'crypto';
import axios from 'axios';

const TWITTER_API_URL = 'https://api.x.com/2/tweets';

const credentials = {
  apiKey: process.env.TWITTER_CUSTOMER_KEY_ID || 'TWITTER_CUSTOMER_KEY_ID',
  apiSecret: process.env.TWITTER_CUSTOMER_KEY_SECRET || 'TWITTER_CUSTOMER_KEY_SECRET',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || 'TWITTER_ACCESS_TOKEN',
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || 'TWITTER_ACCESS_TOKEN_SECRET',
};

function percentEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

function generateNonce(): string {
  return crypto.randomBytes(16).toString('hex');
}

function buildOAuthHeader(method: string, url: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = generateNonce();

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: credentials.apiKey,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: credentials.accessToken,
    oauth_version: '1.0',
  };

  // Create parameter string (sorted by key)
  const paramString = Object.keys(oauthParams)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(oauthParams[key])}`)
    .join('&');

  // Create signature base string
  const baseString = `${method}&${percentEncode(url)}&${percentEncode(paramString)}`;

  // Create signing key
  const signingKey = `${percentEncode(credentials.apiSecret)}&${percentEncode(credentials.accessTokenSecret)}`;

  // Generate HMAC-SHA1 signature
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  oauthParams['oauth_signature'] = signature;

  // Build Authorization header
  const headerString = Object.keys(oauthParams)
    .sort()
    .map((key) => `${percentEncode(key)}="${percentEncode(oauthParams[key])}"`)
    .join(', ');

  return `OAuth ${headerString}`;
}

export async function postTweet(text: string): Promise<{ id: string; text: string }> {
  const authorization = buildOAuthHeader('POST', TWITTER_API_URL);

  const res = await axios.post(
    TWITTER_API_URL,
    { text },
    {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    },
  );

  return res.data.data;
}
