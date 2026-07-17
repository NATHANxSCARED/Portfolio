# Portfolio Backend - Email Service

Backend Express server for handling contact form submissions with email sending capabilities.

## Features

- Express.js server
- Email sending with Nodemailer
- React Email templates for beautiful HTML emails
- Request validation with express-validator
- CORS enabled for frontend communication
- Docker support

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your SMTP credentials:

```bash
cp .env.example .env
```

#### Email Service Options (Free Tier)

**Option 1: Mailtrap (Recommended)**
- Free tier: 500 emails/month
- No setup required for receiving
- Visit: https://mailtrap.io
- Sign up and get your credentials

**Option 2: Gmail**
- Enable 2-factor authentication
- Generate App Password: https://myaccount.google.com/apppasswords
- Use the generated password in .env

### 3. Run Locally

```bash
npm install
npm run dev
```

Server will run on `http://localhost:5000`

### 4. Run with Docker

```bash
docker-compose up --build
```

## API Endpoints

### POST /api/email/contact

Send a contact form email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "This is my message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

### GET /api/email/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Email service is running"
}
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port (default: 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address
- `CORS_ORIGIN` - Frontend URL for CORS

## Email Templates

React Email templates are located in `src/emails/`. Currently includes:

- `ContactEmail.jsx` - Template for contact form submissions

## Testing

Test the endpoint with curl:

```bash
curl -X POST http://localhost:5000/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Email not sending
- Verify SMTP credentials in `.env`
- Check that PORT is not blocked
- Enable "Less secure app access" for Gmail accounts
- For Gmail, use App Password instead of regular password

### Connection refused
- Make sure backend is running
- Check if port 5000 is available
- Verify CORS_ORIGIN matches frontend URL

## License

MIT
