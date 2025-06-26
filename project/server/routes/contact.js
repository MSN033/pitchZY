import express from 'express';
import { sendContactEmail } from '../services/emailService.js';
import { validateContactForm } from '../middleware/validation.js';
import { rateLimitMiddleware } from '../middleware/rateLimit.js';

const router = express.Router();

// Contact form submission endpoint
router.post('/submit', rateLimitMiddleware, validateContactForm, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Send email notification to admin
    await sendContactEmail({
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Log the contact form submission (in a real app, save to database)
    console.log('📧 New contact form submission:', {
      name,
      email,
      phone,
      message: message.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    });
    
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Get contact information endpoint
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      address: {
        street: '1234 Innovation Hub',
        suite: 'Suite 500, Tech District',
        city: 'Hydrabad',
        state: 'CA',
        zipCode: '94105',
        country: 'India'
      },
      phone: '+91 9988135799',
      email: 'hello@pitchzy.com',
      businessHours: {
        monday: '9:00 AM - 6:00 PM PST',
        tuesday: '9:00 AM - 6:00 PM PST',
        wednesday: '9:00 AM - 6:00 PM PST',
        thursday: '9:00 AM - 6:00 PM PST',
        friday: '9:00 AM - 6:00 PM PST',
        saturday: '10:00 AM - 4:00 PM PST',
        sunday: 'Closed'
      },
      responseTime: '24 hours',
      supportAvailability: '24/7'
    }
  });
});

export default router;