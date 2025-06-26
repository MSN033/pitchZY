# pitchZY - Startup Investor Platform

A modern platform connecting startups with investors, featuring a comprehensive contact system with backend API integration.

## Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Email Integration
- **Contact System**: Full-featured contact form with validation and email notifications
- **Rate Limiting**: Protection against spam submissions
- **Email Service**: Automated email notifications for both admins and users

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure Environment Variables**
   
   **Frontend (.env):**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

   **Backend (server/.env):**
   ```
   PORT=5000
   NODE_ENV=development

   # Email Configuration (Gmail example)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@pitchzy.com

   # Admin Email (where contact forms will be sent)
   ADMIN_EMAIL=admin@pitchzy.com

   # CORS Origin
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   # In a new terminal, from the project root
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## API Endpoints

### Contact API

- **POST** `/api/contact/submit` - Submit contact form
- **GET** `/api/contact/info` - Get contact information
- **GET** `/api/health` - Health check

### Contact Form Validation

- **Name**: 2-50 characters, required
- **Email**: Valid email format, required
- **Phone**: Valid phone number format, required
- **Message**: 10-1000 characters, required

### Rate Limiting

- Contact form submissions are limited to 5 requests per 15 minutes per IP address

## Email Configuration

The backend uses Nodemailer for sending emails. Configure your email service in the `server/.env` file:

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account > Security > App passwords
3. Use your Gmail address for `EMAIL_USER`
4. Use the generated app password for `EMAIL_PASS`

### Other Email Providers
Update the `EMAIL_HOST`, `EMAIL_PORT`, and authentication settings according to your provider's documentation.

## Project Structure

```
project/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── services/          # API service layer
│   └── types/             # TypeScript type definitions
├── server/                # Backend source code
│   ├── routes/            # API routes
│   ├── services/          # Business logic services
│   ├── middleware/        # Express middleware
│   └── server.js          # Main server file
└── public/               # Static assets
```

## Development

### Frontend Development
- Built with React 18 + TypeScript
- Styled with Tailwind CSS
- Form validation and error handling
- Responsive design for all devices

### Backend Development
- Express.js REST API
- Input validation with Joi
- Rate limiting middleware
- Email service with HTML templates
- Error handling and logging

## Contact Information

- **Address**: 1234 Innovation Hub, Suite 500, Tech District, Hydrabad, CA 94105
- **Phone**: +91 9988135799
- **Email**: hello@pitchzy.com
- **Response Time**: Within 24 hours
- **Support**: Available 24/7

## License

This project is licensed under the MIT License.