import { NextRequest, NextResponse } from 'next/server'

// Ensure this runs on Node.js runtime
export const runtime = 'nodejs'

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

    // Dynamic import for nodemailer to fix ES module issues
    const nodemailer = await import('nodemailer')
    
    // Check if OAuth2 credentials are available
    const hasOAuth2 = process.env.OAUTH_CLIENT_ID && process.env.OAUTH_CLIENT_SECRET && process.env.OAUTH_REFRESH_TOKEN
    
    let transporter
    
    if (hasOAuth2) {
      // Create transporter with OAuth2
      // Supports both Gmail and Office 365 OAuth2
      transporter = nodemailer.default.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        host: process.env.EMAIL_HOST, // For Office 365: smtp.office365.com
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : undefined,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: process.env.OAUTH_ACCESS_TOKEN,
        },
      })
    } else {
      // Fallback to basic SMTP (for testing or if OAuth2 not configured)
      transporter = nodemailer.default.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Fallback to password if OAuth2 not available
        },
      })
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO ? process.env.EMAIL_TO.split(',').map(email => email.trim()) : [
        'matthew.walzer@mosaicsportcapital.com',
        'dan.mezistrano@mosaicsportcapital.com'
      ],
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
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

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
