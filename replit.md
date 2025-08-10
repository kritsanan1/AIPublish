# replit.md

## Overview

Ayrshaer CMS is a Thai-focused content management system with AI-powered content creation capabilities. The application serves as a comprehensive platform for content creators and businesses to manage articles, images, and products while providing integrated payment systems, analytics dashboards, and AI-driven personalization features. Built as a single-page application with a modern tech stack, it targets local Thai businesses and content creators with a freemium subscription model.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses a modern React-based architecture built with Vite for fast development and optimized builds. The UI is constructed using shadcn/ui components with Radix UI primitives for accessibility, styled with Tailwind CSS using a custom design system with CSS variables. The application follows a component-driven architecture with separate pages for dashboard, content management, analytics, AI tools, payments, and user management. State management is handled through TanStack React Query for server state and React hooks for local state.

### Backend Architecture
The server is built with Express.js and follows a RESTful API design pattern. The backend implements a storage abstraction layer that interfaces with the database through Drizzle ORM. Key services include OpenAI integration for content generation and analytics insights, Stripe integration for payment processing, and Replit Auth for authentication. The server handles file uploads, content management operations, user management, payment processing, and AI-powered features.

### Database Design
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes tables for users (with role-based access), articles, images, products, payments, analytics events, and sessions. User roles are implemented with an enum supporting 'user' and 'admin' levels. The database supports content management with status tracking, view counting, and metadata storage for AI-generated content.

### Authentication System
Authentication is handled through Replit's OAuth system with session-based authentication using express-session with PostgreSQL session storage. The system supports automatic login redirects and maintains user sessions with proper security configurations including httpOnly cookies and secure flags for production environments.

### AI Integration
The application integrates OpenAI's GPT-4o model for content generation and analytics insights. AI features include content creation for articles, product descriptions, social media posts, and email content with configurable tone and length parameters. The system also provides sentiment analysis and predictive analytics capabilities for business insights.

## External Dependencies

- **Database**: PostgreSQL via Neon serverless with connection pooling
- **Authentication**: Replit OAuth with OpenID Connect for user authentication
- **AI Services**: OpenAI API for content generation and analytics insights
- **Payment Processing**: Stripe for subscription management and payment processing
- **UI Components**: Radix UI primitives and shadcn/ui component library
- **Fonts**: Google Fonts (Inter and Poppins) for typography
- **Development Tools**: Vite for frontend tooling, ESBuild for backend bundling, and Drizzle Kit for database migrations