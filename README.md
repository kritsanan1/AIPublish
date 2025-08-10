
# Ayrshaer CMS

A Thai-focused content management system with AI-powered content creation capabilities. Built as a modern single-page application targeting local Thai businesses and content creators with a freemium subscription model.

## 🚀 Features

- **AI-Powered Content Generation**: Leverage GPT-4o for articles, product descriptions, and social media content
- **Analytics Dashboard**: Comprehensive insights with predictive analytics
- **Content Management**: Full CRUD operations for articles, images, and products
- **Payment Integration**: Stripe-powered subscription management
- **User Management**: Role-based access control (user/admin)
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Thai Language Support**: Optimized for Thai content creators

## 🛠 Technical Requirements

### System Requirements
- **Node.js**: 18.0+ (LTS recommended)
- **PostgreSQL**: 14.0+
- **NPM**: 8.0+

### Development Environment
- **Operating System**: Linux, macOS, or Windows with WSL2
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🔧 Installation Guide

### 1. Clone Repository
```bash
git clone <repository-url>
cd ayrshaer-cms
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the environment template and configure your settings:
```bash
cp .env.example .env
```

Required environment variables:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/ayrshaer_cms"

# Authentication (Replit OAuth)
REPLIT_CLIENT_ID="your_replit_client_id"
REPLIT_CLIENT_SECRET="your_replit_client_secret"

# OpenAI Integration
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe Payment Processing
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# Session Security
SESSION_SECRET="your-secure-session-secret"

# Development/Production
NODE_ENV="development"
PORT="5000"
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push

# Verify connection
npm run check
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📋 Development Guidelines

### Code Style Conventions
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Follow configured linting rules
- **Prettier**: Auto-formatting on save
- **Import Order**: External libraries → Internal modules → Relative imports
- **Naming Conventions**:
  - Components: PascalCase (`ContentGenerator`)
  - Functions: camelCase (`generateContent`)
  - Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
  - Files: kebab-case (`content-generator.tsx`)

### Git Workflow
- **Branch Naming**: `[type]/[ticket-number]-[description]`
  - `feature/CMS-123-add-ai-content-generator`
  - `bugfix/CMS-456-fix-authentication-redirect`
  - `hotfix/CMS-789-critical-payment-issue`

### Pull Request Template
```markdown
## 📝 Changes Made
- Brief description of changes
- List of modified components/files

## 🧪 Testing Steps
1. Step-by-step testing instructions
2. Expected behavior verification
3. Edge cases tested

## 📸 Screenshots
[Include relevant UI changes]

## ✅ Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Performance impact considered
```

### Code Review Criteria
- **Functionality**: Code works as intended
- **Readability**: Clear, self-documenting code
- **Performance**: No unnecessary re-renders or API calls
- **Security**: Proper input validation and authentication checks
- **Testing**: Adequate test coverage for new features
- **Documentation**: Updated comments and documentation

## 🚢 Deployment Process

### Replit Deployment
This application is optimized for Replit's deployment platform.

1. **Environment Variables**: Configure production environment variables in Replit Secrets
2. **Database**: Set up PostgreSQL database connection
3. **Build Process**: 
   ```bash
   npm run build
   ```
4. **Production Start**: 
   ```bash
   npm start
   ```

### Environment-Specific Configuration
- **Development**: Uses `npm run dev` with hot reloading
- **Production**: Uses `npm start` with optimized builds
- **Testing**: Uses `npm test` with Vitest

### Rollback Procedures
1. **Immediate Rollback**: Revert to previous Replit deployment
2. **Database Rollback**: Use database backup restoration
3. **Cache Clearing**: Clear CDN and browser caches
4. **Health Check**: Verify all services are operational

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- components/dashboard

# Run tests in watch mode
npm test -- --watch
```

### Test Structure
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and database testing
- **Component Tests**: React component rendering and interaction

## 📊 Scripts Reference

| Script | Description | Example |
|--------|-------------|---------|
| `npm run dev` | Start development server with hot reload | `npm run dev` |
| `npm run build` | Build for production | `npm run build` |
| `npm start` | Start production server | `npm start` |
| `npm run check` | TypeScript type checking | `npm run check` |
| `npm run db:push` | Push database schema changes | `npm run db:push` |
| `npm test` | Run test suite | `npm test` |

## 🏗 Architecture Overview

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query + React hooks
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OAuth with express-session
- **AI Integration**: OpenAI GPT-4o API
- **Payments**: Stripe API integration

### Key Integrations
- **OpenAI**: Content generation and sentiment analysis
- **Stripe**: Subscription and payment processing
- **Replit Auth**: User authentication and session management
- **PostgreSQL**: Primary data storage with connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch following naming conventions
3. Make your changes with proper testing
4. Submit a pull request with the required template
5. Ensure all checks pass before requesting review

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check database URL format
echo $DATABASE_URL

# Test connection
npm run db:push
```

#### Build Failures
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run check
```

#### Authentication Issues
- Verify Replit OAuth credentials
- Check session secret configuration
- Ensure cookies are enabled in browser

#### OpenAI API Errors
- Verify API key is valid and has sufficient credits
- Check rate limiting and usage quotas
- Ensure proper error handling in content generation

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Documentation**: `/replit.md`
- **API Reference**: `/server/routes.ts`
- **Component Library**: shadcn/ui documentation
- **Database Schema**: `/shared/schema.ts`
