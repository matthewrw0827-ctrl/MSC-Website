# Vercel Environment Variables Setup

Add these environment variables in your Vercel dashboard:

## Required Environment Variables

```env
# Email Configuration
EMAIL_USER=matthew.walzer@mosaicsportcapital.com
EMAIL_FROM=contact@mosaicsportcapital.com
EMAIL_TO=matthew.walzer@mosaicsportcapital.com,dan.mezistrano@mosaicsportcapital.com

# Office 365 OAuth2 Credentials (Client Credentials Flow)
OAUTH_CLIENT_ID=your-azure-app-client-id
OAUTH_CLIENT_SECRET=your-azure-app-client-secret
OAUTH_TENANT_ID=your-azure-tenant-id

# Fallback SMTP credentials (if OAuth2 not configured)
EMAIL_PASS=your-app-password
```

## How to Get Office 365 OAuth2 Credentials

### 1. Azure App Registration
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Name: "Mosaic Contact Form"
5. Supported account types: "Accounts in this organizational directory only"
6. Redirect URI: Leave empty (not needed for client credentials flow)
7. Click "Register"

### 2. Get Client ID and Tenant ID
1. Copy the "Application (client) ID" - this is your `OAUTH_CLIENT_ID`
2. Copy the "Directory (tenant) ID" - this is your `OAUTH_TENANT_ID`

### 3. Create Client Secret
1. Go to "Certificates & secrets" → "New client secret"
2. Description: "Contact Form Secret"
3. Expires: "24 months"
4. Copy the secret value - this is your `OAUTH_CLIENT_SECRET`

### 4. API Permissions (Application Permissions)
1. Go to "API permissions" → "Add a permission"
2. Select "Microsoft Graph" → "Application permissions"
3. Add these permissions:
   - `Mail.Send` (Application permission)
4. Click "Grant admin consent" (requires admin privileges)

### 5. Test the Setup
The system will automatically:
- Use client credentials flow to get access tokens
- No manual token generation needed
- Tokens are refreshed automatically as needed

## Security Notes
- ✅ No passwords stored in code
- ✅ OAuth2 tokens are secure
- ✅ Refresh tokens auto-renew access tokens
- ✅ All credentials in Vercel environment variables
