import { NextRequest, NextResponse } from 'next/server'

// Ensure this runs on Node.js runtime
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

// Email sending using nodemailer with Office 365 OAuth2
async function sendEmail(name: string, email: string, subject: string, message: string) {
  try {
    // Dynamic import to avoid ES module issues
    const nodemailer = (await import('nodemailer')).default
    
    // Check if OAuth2 credentials are available
    const hasOAuth2 = process.env.OAUTH_CLIENT_ID && process.env.OAUTH_CLIENT_SECRET && process.env.OAUTH_TENANT_ID
    
    let transporter
    
    if (hasOAuth2) {
      // Get access token using client credentials flow
      const accessToken = await getAccessToken()
      
      // Create transporter with OAuth2 for Office 365
      transporter = nodemailer.createTransporter({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          accessToken: accessToken,
        },
        tls: {
          ciphers: 'SSLv3'
        }
      })
    } else {
      // Fallback to basic SMTP auth
      transporter = nodemailer.createTransporter({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          ciphers: 'SSLv3'
        }
      })
    }

    const recipients = process.env.EMAIL_TO ? process.env.EMAIL_TO.split(',').map(email => email.trim()) : [
      'matthew.walzer@mosaicsportcapital.com',
      'dan.mezistrano@mosaicsportcapital.com'
    ]

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipients,
      subject: `Contact Form: ${subject}`,
      html: `
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
      `,
      text: `
New Contact Form Submission

Contact Details:
- Name: ${name}
- Email: ${email}
- Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
From: Mosaic Sport Capital Contact Form
      `,
    }

    // Send email
    const result = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully:', result.messageId)
    return { success: true, message: 'Email sent successfully', messageId: result.messageId }

  } catch (error) {
    console.error('Nodemailer error:', error)
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
