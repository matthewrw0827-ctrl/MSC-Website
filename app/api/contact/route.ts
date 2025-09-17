import { NextRequest, NextResponse } from 'next/server'

// Force Node.js runtime
export const runtime = 'nodejs'

// Get access token using client credentials flow
async function getAccessToken() {
  try {
    const tokenUrl = `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/token`
    
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID!,
      client_secret: process.env.OAUTH_CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    })

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
    }

    const tokenData = await response.json()
    return tokenData.access_token
  } catch (error) {
    console.error('Error getting access token:', error)
    throw error
  }
}

// Email sending using Microsoft Graph API
async function sendEmail(name: string, email: string, subject: string, message: string) {
  try {
    // Get access token
    const accessToken = await getAccessToken()
    
    const recipients = process.env.EMAIL_TO ? process.env.EMAIL_TO.split(',').map(email => email.trim()) : [
      'matthew.walzer@mosaicsportcapital.com',
      'dan.mezistrano@mosaicsportcapital.com'
    ]

    // Create email message for Graph API
    const emailMessage = {
      message: {
        subject: `Contact Form: ${subject}`,
        body: {
          contentType: 'HTML',
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                <h3 style="color: #495057; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>From:</strong> Mosaic Sport Capital Contact Form</p>
              </div>
            </div>
          `
        },
        toRecipients: recipients.map(recipient => ({
          emailAddress: {
            address: recipient
          }
        })),
        from: {
          emailAddress: {
            address: process.env.EMAIL_FROM || process.env.EMAIL_USER
          }
        }
      },
      saveToSentItems: true
    }

    // Send email using Graph API - use the specific from email address
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER
    const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailMessage)
    })

    if (!graphResponse.ok) {
      const errorText = await graphResponse.text()
      throw new Error(`Graph API request failed: ${graphResponse.status} ${graphResponse.statusText} - ${errorText}`)
    }

    console.log('Email sent successfully via Graph API')
    console.log('Sent from:', fromEmail)
    console.log('Sent to:', recipients)
    return { success: true, message: 'Email sent successfully via Graph API' }

  } catch (error) {
    console.error('Graph API error:', error)
    return { success: false, message: 'Failed to send email', error: error }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Debug: Log environment variables (without secrets)
    console.log('Environment check:')
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM)
    console.log('EMAIL_TO:', process.env.EMAIL_TO)
    console.log('OAUTH_CLIENT_ID:', process.env.OAUTH_CLIENT_ID ? 'Set' : 'Missing')
    console.log('OAUTH_CLIENT_SECRET:', process.env.OAUTH_CLIENT_SECRET ? 'Set' : 'Missing')
    console.log('OAUTH_TENANT_ID:', process.env.OAUTH_TENANT_ID)

    // Send email using the simple function
    const result = await sendEmail(name, email, subject, message)

    if (result.success) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error sending email:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: 'Failed to send email. Please check server logs for details.' },
      { status: 500 }
    )
  }
}
