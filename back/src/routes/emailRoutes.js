import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail } from '../emailService.js';

const router = express.Router();

// POST endpoint for contact form
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Send email
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Error in /contact route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET endpoint for health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email service is running' });
});

export default router;
