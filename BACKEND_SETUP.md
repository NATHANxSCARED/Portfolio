# Portfolio - Email Backend Integration

This portfolio now includes a full-stack email system with an Express backend and React frontend.

## Project Structure

```
.
├── front/                 # React frontend
│   └── src/
│       └── page/
│           └── Contact.jsx  # Updated with API integration
├── back/                  # Express backend
│   ├── src/
│   │   ├── index.js       # Main server
│   │   ├── emailService.js
│   │   ├── routes/
│   │   │   └── emailRoutes.js
│   │   └── emails/
│   │       └── ContactEmail.jsx  # React Email template
│   └── package.json
├── docker-compose.yml     # Updated with backend service
└── .env                   # Email configuration
```

## Quick Start

### 1. Configure Email Service

Copy `.env.example` to `.env` and configure your email provider:

```bash
cp .env.example .env
```

#### Choose Your Email Provider:

**Option A: Mailtrap (Recommended - Free 500 emails/month)**
- Visit https://mailtrap.io
- Sign up for free
- Copy your SMTP credentials to `.env`

**Option B: Gmail**
- Enable 2-factor authentication on your Google account
- Generate App Password: https://myaccount.google.com/apppasswords
- Use these credentials in `.env`

### 2. Local Development

**Backend:**
```bash
cd back
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

**Frontend:**
```bash
cd front
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### 3. Docker (Production)

Build and run everything with Docker Compose:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Automatic CORS configuration

## API Reference

### Send Contact Email

**Endpoint:** `POST /api/email/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### Health Check

**Endpoint:** `GET /api/email/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Email service is running"
}
```

## Email Template

Emails are built with React Email (`@react-email/components`) providing a modern, responsive template. The template is located in `back/src/emails/ContactEmail.jsx`.

To customize the email template, edit `ContactEmail.jsx` and restart the backend.

## Environment Variables

### Backend (`back/.env`)
```
PORT=5000
NODE_ENV=development
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_mailtrap_email
SMTP_PASS=your_mailtrap_password
EMAIL_FROM=noreply@portfolio.com
EMAIL_TO=your_email@example.com
CORS_ORIGIN=http://localhost:3000
```

### Root (`.env`) - For Docker
Same as backend, used by docker-compose.

## Troubleshooting

### Email not sending
- Verify SMTP credentials in `.env`
- Check EMAIL_TO is set to your email address
- For Gmail: use App Password, not your regular password
- For Mailtrap: ensure credentials are correct

### CORS errors
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- In Docker: CORS_ORIGIN should be `http://frontend` (service name)

### Backend connection refused
- Ensure backend is running on port 5000
- Check `.env` configuration
- Verify no other service is using port 5000

### Docker issues
- Rebuild with `docker-compose up --build`
- Check logs: `docker-compose logs backend`
- Ensure `.env` file exists at project root

## Testing

Test the API with curl:

```bash
curl -X POST http://localhost:5000/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message from curl"
  }'
```

## Technologies Used

- **Frontend:** React, SCSS
- **Backend:** Express.js, Nodemailer
- **Email:** React Email, @react-email/render
- **Validation:** express-validator
- **Container:** Docker, Docker Compose
- **CORS:** cors middleware

## Free Email Service Limits

- **Mailtrap:** 500 emails/month (free tier)
- **Gmail:** Limited by account sending limits (~500/day)
- **SendGrid:** 100 emails/day (free tier)

## Security Notes

- Never commit `.env` file to version control
- Use App Passwords for Gmail, not your main password
- Keep SMTP credentials secure
- Validate all form inputs (already implemented)
- Use HTTPS in production

## Support

For issues with specific email providers:
- Mailtrap: https://help.mailtrap.io
- Gmail: https://support.google.com
- React Email: https://react.email

## License

MIT
