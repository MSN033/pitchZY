import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form email to admin
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const { name, email, phone, message, timestamp } = contactData;
    
    // Email template for admin notification
    const adminEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">pitchZY</h1>
          <h2 style="color: #374151; margin: 10px 0;">New Contact Form Submission</h2>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #4b5563;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This message was sent through the pitchZY contact form.</p>
          <p>Please respond to the customer at: <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
        </div>
      </div>
    `;
    
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailTemplate,
    });
    
    // Send confirmation email to user
    const userEmailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">pitchZY</h1>
          <h2 style="color: #374151; margin: 10px 0;">Thank You for Contacting Us!</h2>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0; color: #374151;">Dear ${name},</p>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for reaching out to pitchZY! We have received your message and will get back to you within 24 hours.
          </p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
          <p style="line-height: 1.6; color: #4b5563; font-style: italic;">"${message}"</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #2563eb; border-radius: 8px; text-align: center;">
          <p style="color: white; margin: 0; font-weight: bold;">Need immediate assistance?</p>
          <p style="color: #bfdbfe; margin: 10px 0;">Call us at: +91 9988135799</p>
          <p style="color: #bfdbfe; margin: 0;">Email us at: hello@pitchzy.com</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #6b7280;">
          <p>Best regards,<br>The pitchZY Team</p>
        </div>
      </div>
    `;
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting pitchZY!',
      html: userEmailTemplate,
    });
    
    console.log('✅ Contact form emails sent successfully');
    
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    throw error;
  }
};