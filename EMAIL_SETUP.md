# Email Setup Guide

Your contact form is now configured to send emails to both:
- matthew.walzer@mosaicsportcapital.com
- dan.mezistrano@mosaicsportcapital.com

## Setup Instructions

### 1. Create Environment File
Create a `.env.local` file in your project root with the following content:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail Setup (Recommended)
If using Gmail, follow these steps:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password (not your regular Gmail password) in `EMAIL_PASS`

### 3. Other Email Services
The system supports other email services. Update the `service` field in `app/api/contact/route.ts`:
- `outlook` for Outlook/Hotmail
- `yahoo` for Yahoo Mail
- Or use custom SMTP settings

### 4. Test the Setup
1. Start your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check both email inboxes for the message

## Features

✅ **Dual Email Routing**: Messages go to both Matthew and Dan  
✅ **Form Validation**: Client and server-side validation  
✅ **User Feedback**: Success/error messages  
✅ **Loading States**: Button shows "Sending..." during submission  
✅ **Professional Email Format**: HTML and text versions  
✅ **Security**: Input sanitization and validation  

## Troubleshooting

- **"Failed to send email"**: Check your email credentials and app password
- **"Invalid email format"**: Ensure the sender's email is properly formatted
- **Network errors**: Check your internet connection and API route

## Customization

To modify email recipients, edit the `to` array in `app/api/contact/route.ts`:
```typescript
to: [
  'matthew.walzer@mosaicsportcapital.com',
  'dan.mezistrano@mosaicsportcapital.com'
],
```
