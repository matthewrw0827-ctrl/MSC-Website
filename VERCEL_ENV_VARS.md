# Vercel Environment Variables Setup

Add these environment variables in your Vercel dashboard:

## Required Environment Variables

```env
# Email Configuration
EMAIL_USER=your-email@domain.com
EMAIL_FROM=contact@mosaicsportcapital.com
EMAIL_TO=matthew.walzer@mosaicsportcapital.com,dan.mezistrano@mosaicsportcapital.com

# OAuth2 Credentials (works with Gmail or Office 365)
# If these are not set, it will fallback to basic SMTP auth
OAUTH_CLIENT_ID=your-oauth-client-id
OAUTH_CLIENT_SECRET=your-oauth-client-secret
OAUTH_REFRESH_TOKEN=your-refresh-token
OAUTH_ACCESS_TOKEN=your-access-token

# Fallback SMTP credentials (if OAuth2 not configured)
EMAIL_PASS=your-app-password

# Optional: Email Service Configuration
EMAIL_SERVICE=gmail  # or leave empty for Gmail
EMAIL_HOST=smtp.office365.com  # For Office 365
EMAIL_PORT=587  # For Office 365
EMAIL_SECURE=false  # For Office 365
```

## How to Get OAuth2 Credentials

### Option 1: Gmail OAuth2

#### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized redirect URIs: `https://yourdomain.com/api/auth/callback`
7. Copy Client ID and Client Secret

#### 2. Generate Refresh Token
Use this script to generate refresh token:

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'https://yourdomain.com/api/auth/callback'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

console.log('Authorize this app by visiting this url:', authUrl);
```

#### 3. Alternative: Use OAuth2 Playground
1. Go to [OAuth2 Playground](https://developers.google.com/oauthplayground/)
2. Select Gmail API v1 → `https://www.googleapis.com/auth/gmail.send`
3. Authorize and get refresh token

### Option 2: Office 365 OAuth2

#### 1. Azure App Registration
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Set redirect URI: `https://yourdomain.com/api/auth/callback`
5. Note down Application (client) ID and create a client secret

#### 2. API Permissions
1. Go to "API permissions" → "Add a permission"
2. Select "Microsoft Graph" → "Application permissions"
3. Add "Mail.Send" permission
4. Grant admin consent

#### 3. Generate Tokens
Use Microsoft Graph API to generate access and refresh tokens for your application.

## Security Notes
- ✅ No passwords stored in code
- ✅ OAuth2 tokens are secure
- ✅ Refresh tokens auto-renew access tokens
- ✅ All credentials in Vercel environment variables
