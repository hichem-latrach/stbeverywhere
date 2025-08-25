# STB Everywhere Connect - Backend API

A comprehensive Node.js backend for the STB Everywhere Connect banking application, built with Express.js, TypeScript, Prisma ORM, and MySQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- Git

### Installation

1. **Clone and setup:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/stb_everywhere"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_REFRESH_SECRET="your-super-secret-refresh-jwt-key"
   PORT=3001
   NODE_ENV="development"
   
   # Email Configuration
   MAIL_HOST="smtp.gmail.com"
   MAIL_PORT=587
   MAIL_USER="your-email@gmail.com"
   MAIL_PASS="your-app-password"
   MAIL_FROM="STB Everywhere <noreply@stb.com.tn>"
   
   # File Storage
   STORAGE_PATH="./uploads"
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES="image/jpeg,image/png,application/pdf"
   ```

3. **Database Setup:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed database with test data
   npm run db:seed
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middlewares/     # Express middlewares
│   ├── routes/          # API route definitions
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── scripts/         # Database scripts
│   └── server.ts        # Main application entry
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── uploads/             # File storage directory
└── package.json
```

## 🔐 Authentication & Security

### Default Test Accounts

After running the seed script, you can use these accounts:

**Admin Users:**
- Email: `admin@stb.com.tn` / Password: `admin123`
- Email: `test@admin.com` / Password: `test123`

**Client Users:**
- Email: `hichem@example.com` / Password: `password123`
- Email: `sarah@example.com` / Password: `password123`
- Email: `mohamed@example.com` / Password: `password123`

### Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt (12 rounds)
- Role-based access control (Admin/Client)
- Rate limiting on authentication endpoints
- Input validation with Zod
- File upload validation and security
- CORS protection
- Helmet security headers

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /send-otp` - Send OTP for MFA
- `POST /verify-otp` - Verify OTP code

### User Management (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /change-password` - Change password
- `GET /requests` - Get user's requests
- `GET /transactions` - Get user's transactions
- `GET /accounts` - Get user's accounts

### Admin Panel (`/api/admin`)
- `GET /users` - List all users (paginated)
- `GET /users/:id` - Get user details
- `PUT /users/:id/status` - Update user status
- `DELETE /users/:id` - Delete user
- `GET /requests` - Get all requests
- `GET /requests/:type` - Get requests by type
- `PUT /requests/:id/status` - Update request status
- `GET /kyc-modifications` - Get KYC modification requests
- `PUT /kyc-modifications/:id` - Process KYC modification
- `GET /dashboard/stats` - Get dashboard statistics

### Banking Requests (`/api/requests`)
- `POST /checkbook` - Create checkbook request
- `GET /checkbook` - Get user's checkbook requests
- `PUT /checkbook/:id` - Update checkbook request
- `DELETE /checkbook/:id` - Delete checkbook request
- `POST /credit-card` - Create credit card request
- `GET /credit-card` - Get user's credit card requests
- `POST /account` - Create account opening request
- `POST /tf-bank` - Create TF Bank account request

### KYC Management (`/api/kyc`)
- `GET /` - Get user's KYC information
- `PUT /` - Update KYC information
- `POST /modification-request` - Request KYC field modification
- `GET /modification-requests` - Get user's modification requests

### Document Management (`/api/documents`)
- `POST /upload` - Upload documents (multipart/form-data)
- `GET /` - Get user's documents
- `GET /:id` - Download document
- `DELETE /:id` - Delete document

### Blog Management (`/api/blog`)
- `GET /` - Get published blog posts (public)
- `GET /:id` - Get blog post by ID (public)
- `POST /` - Create blog post (admin only)
- `PUT /:id` - Update blog post (admin only)
- `DELETE /:id` - Delete blog post (admin only)

### Contact Management (`/api/contact`)
- `POST /` - Submit contact inquiry (public)
- `GET /` - Get contact inquiries (admin only)
- `GET /:id` - Get contact inquiry details (admin only)
- `PUT /:id/status` - Update inquiry status (admin only)
- `POST /:id/reply` - Reply to inquiry (admin only)

## 🗄️ Database Schema

The application uses MySQL with Prisma ORM. Key entities include:

- **Users** - Authentication and profile information
- **KycInfo** - Know Your Customer data
- **Accounts** - Bank accounts with balances
- **Transactions** - Financial transaction history
- **Requests** - Various banking service requests
- **Documents** - Uploaded files and documents
- **BlogPosts** - Content management
- **ContactInquiries** - Customer support tickets

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build           # Build for production
npm start              # Start production server

# Database
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed database with test data
npm run db:reset       # Reset database (destructive)
npm run db:studio      # Open Prisma Studio

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm test              # Run tests
```

## 📝 API Testing

Use the provided test accounts to explore the API:

1. **Register a new user** via `POST /api/auth/register`
2. **Login** via `POST /api/auth/login` to get access tokens
3. **Access protected endpoints** using the Bearer token
4. **Test admin features** using admin credentials

### Example API Calls

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "hichem@example.com", "password": "password123"}'

# Get user profile (replace TOKEN with actual token)
curl -X GET http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer TOKEN"

# Create checkbook request
curl -X POST http://localhost:3001/api/requests/checkbook \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+21655604103", "email": "test@example.com", "rib": "12345678901234567890", "checkbookType": "standard", "idType": "cin", "idNumber": "12345678"}'
```

## 🔒 Security Considerations

- All passwords are hashed using bcrypt with 12 rounds
- JWT tokens have short expiration times (15 minutes for access, 7 days for refresh)
- Rate limiting prevents brute force attacks
- Input validation prevents injection attacks
- File uploads are validated and stored securely
- CORS is configured for production security

## 🚀 Production Deployment

1. **Environment Variables:**
   - Set `NODE_ENV=production`
   - Use strong, unique JWT secrets
   - Configure production database URL
   - Set up email service credentials

2. **Database:**
   - Run migrations: `npm run db:migrate`
   - Ensure database backups are configured

3. **File Storage:**
   - Consider using cloud storage (AWS S3, Google Cloud Storage)
   - Update file serving logic accordingly

4. **Monitoring:**
   - Set up application monitoring
   - Configure error tracking
   - Monitor database performance

## 🤝 Integration with Frontend

The backend is designed to work seamlessly with the existing STB Everywhere Connect frontend. Update your frontend's API base URL to point to this backend:

```typescript
// In your frontend environment configuration
const API_BASE_URL = 'http://localhost:3001/api';
```

## 📞 Support

For technical support or questions about the backend implementation, please contact the STB Development Team.

---

**STB Everywhere Connect Backend** - Secure, scalable, and production-ready banking API.