
# File Structure Documentation

## Project Overview
This document provides a complete analysis of the Ayrshaer CMS file structure, including complexity indicators and functional descriptions.

## File Tree Structure

```
├── .config/                                    # Configuration directory
│   └── npm/                                   # NPM configuration
│       └── node_global/                       # Global NPM packages
│           └── lib/                           # NPM library files
├── attached_assets/                           # Uploaded assets and attachments
├── client/                                    # Frontend React application 🟢
│   ├── src/                                  # Source code directory
│   │   ├── components/                       # React components
│   │   │   ├── ai/                          # AI-related components
│   │   │   │   ├── content-generator.tsx     🟡 # AI content generation interface
│   │   │   │   └── predictive-analytics.tsx  🟢 # Analytics predictions component
│   │   │   ├── content/                      # Content management components
│   │   │   │   └── content-table.tsx         🟡 # Content listing and management table
│   │   │   ├── dashboard/                    # Dashboard components
│   │   │   │   ├── analytics-chart.tsx       🟢 # Analytics visualization component
│   │   │   │   ├── recent-activity.tsx       🟢 # Recent activity feed component
│   │   │   │   └── stats-cards.tsx           🟢 # Statistics cards component
│   │   │   ├── layout/                       # Layout components
│   │   │   │   ├── header.tsx                🟡 # Application header component
│   │   │   │   └── sidebar.tsx               🟡 # Navigation sidebar component
│   │   │   └── ui/                           # UI component library (shadcn/ui)
│   │   │       ├── accordion.tsx             🟢 # Collapsible content component
│   │   │       ├── alert-dialog.tsx          🟢 # Modal dialog component
│   │   │       ├── alert.tsx                 🟢 # Alert notification component
│   │   │       ├── aspect-ratio.tsx          🟢 # Aspect ratio container
│   │   │       ├── avatar.tsx                🟢 # User avatar component
│   │   │       ├── badge.tsx                 🟢 # Status badge component
│   │   │       ├── breadcrumb.tsx            🟢 # Navigation breadcrumb
│   │   │       ├── button.tsx                🟢 # Button component variants
│   │   │       ├── calendar.tsx              🟢 # Date picker calendar
│   │   │       ├── card.tsx                  🟢 # Card container component
│   │   │       ├── carousel.tsx              🟢 # Image carousel component
│   │   │       ├── chart.tsx                 🟢 # Chart visualization wrapper
│   │   │       ├── checkbox.tsx              🟢 # Checkbox input component
│   │   │       ├── collapsible.tsx           🟢 # Collapsible content wrapper
│   │   │       ├── command.tsx               🟢 # Command palette component
│   │   │       ├── context-menu.tsx          🟢 # Right-click context menu
│   │   │       ├── dialog.tsx                🟢 # Modal dialog wrapper
│   │   │       ├── drawer.tsx                🟢 # Slide-out drawer component
│   │   │       ├── dropdown-menu.tsx         🟢 # Dropdown menu component
│   │   │       ├── form.tsx                  🟢 # Form wrapper with validation
│   │   │       ├── hover-card.tsx            🟢 # Hover tooltip card
│   │   │       ├── input-otp.tsx             🟢 # OTP input component
│   │   │       ├── input.tsx                 🟢 # Text input component
│   │   │       ├── label.tsx                 🟢 # Form label component
│   │   │       ├── menubar.tsx               🟢 # Menu bar component
│   │   │       ├── navigation-menu.tsx       🟢 # Navigation menu component
│   │   │       ├── pagination.tsx            🟢 # Pagination controls
│   │   │       ├── popover.tsx               🟢 # Popover tooltip component
│   │   │       ├── progress.tsx              🟢 # Progress bar component
│   │   │       ├── radio-group.tsx           🟢 # Radio button group
│   │   │       ├── resizable.tsx             🟢 # Resizable panel component
│   │   │       ├── scroll-area.tsx           🟢 # Custom scrollable area
│   │   │       ├── select.tsx                🟢 # Select dropdown component
│   │   │       ├── separator.tsx             🟢 # Visual separator line
│   │   │       ├── sheet.tsx                 🟢 # Slide-out sheet component
│   │   │       ├── sidebar.tsx               🟢 # Sidebar layout component
│   │   │       ├── skeleton.tsx              🟢 # Loading skeleton component
│   │   │       ├── slider.tsx                🟢 # Range slider component
│   │   │       ├── switch.tsx                🟢 # Toggle switch component
│   │   │       ├── table.tsx                 🟢 # Table component
│   │   │       ├── tabs.tsx                  🟢 # Tab navigation component
│   │   │       ├── textarea.tsx              🟢 # Multi-line text input
│   │   │       ├── toast.tsx                 🟢 # Toast notification component
│   │   │       ├── toaster.tsx               🟢 # Toast notification manager
│   │   │       ├── toggle-group.tsx          🟢 # Toggle button group
│   │   │       ├── toggle.tsx                🟢 # Toggle button component
│   │   │       └── tooltip.tsx               🟢 # Tooltip component
│   │   ├── hooks/                            # Custom React hooks
│   │   │   ├── use-mobile.tsx                🟢 # Mobile device detection hook
│   │   │   ├── use-toast.ts                  🟢 # Toast notification hook
│   │   │   └── useAuth.ts                    🟡 # Authentication state hook
│   │   ├── lib/                              # Utility libraries
│   │   │   ├── authUtils.ts                  🟢 # Authentication utility functions
│   │   │   ├── queryClient.ts                🟢 # React Query client configuration
│   │   │   └── utils.ts                      🟢 # General utility functions
│   │   ├── pages/                            # Page components (routes)
│   │   │   ├── ai-tools.tsx                  🔴 # AI tools and content generation page
│   │   │   ├── analytics.tsx                 🟡 # Analytics dashboard page
│   │   │   ├── content-management.tsx        🟡 # Content management page
│   │   │   ├── dashboard.tsx                 🟡 # Main dashboard page
│   │   │   ├── landing.tsx                   🟡 # Landing page component
│   │   │   ├── not-found.tsx                 🟢 # 404 error page
│   │   │   ├── payments.tsx                  🟡 # Payment management page
│   │   │   └── user-management.tsx           🟡 # User management page
│   │   ├── test/                             # Test files
│   │   │   ├── api/                          # API tests
│   │   │   │   └── auth.test.ts              🟢 # Authentication API tests
│   │   │   ├── components/                   # Component tests
│   │   │   │   ├── content-management.test.tsx 🟢 # Content management tests
│   │   │   │   └── dashboard.test.tsx         🟢 # Dashboard component tests
│   │   │   ├── utils/                        # Utility tests
│   │   │   │   └── helpers.test.ts           🟢 # Helper function tests
│   │   │   ├── setup.ts                      🟢 # Test environment setup
│   │   │   └── simple.test.ts                🟢 # Basic application tests
│   │   ├── App.tsx                           🟡 # Root React application component
│   │   ├── index.css                         🟢 # Global CSS styles and Tailwind
│   │   └── main.tsx                          🟢 # React application entry point
│   └── index.html                            🟢 # HTML entry point template
├── server/                                   # Backend Express.js application
│   ├── db.ts                                 🟡 # Database connection and configuration
│   ├── index.ts                              🟡 # Express server entry point
│   ├── openai.ts                             🟢 # OpenAI API integration
│   ├── replitAuth.ts                         🟡 # Replit authentication setup
│   ├── routes.ts                             🔴 # API routes and endpoints
│   ├── storage.ts                            🔴 # Database operations and queries
│   └── vite.ts                               🟡 # Vite development server configuration
├── shared/                                   # Shared types and schemas
│   └── schema.ts                             🔴 # Database schema and type definitions
├── .env.example                              🟢 # Environment variables template
├── .gitignore                                🟢 # Git ignore patterns
├── .replit                                   🟢 # Replit configuration
├── components.json                           🟢 # shadcn/ui components configuration
├── drizzle.config.ts                         🟢 # Drizzle ORM configuration
├── package-lock.json                         🟢 # NPM dependency lock file
├── package.json                              🟢 # NPM package configuration
├── postcss.config.js                         🟢 # PostCSS configuration
├── replit.md                                 🟢 # Project documentation
├── tailwind.config.ts                        🟢 # Tailwind CSS configuration
├── tsconfig.json                             🟢 # TypeScript configuration
├── vite.config.ts                            🟢 # Vite build tool configuration
└── vitest.config.ts                          🟢 # Vitest testing configuration
```

## Complexity Analysis

### Import Complexity Legend
- 🟢 **Low Complexity (0-3 imports)**: 43 files
- 🟡 **Medium Complexity (4-7 imports)**: 18 files  
- 🔴 **High Complexity (8+ imports)**: 4 files

### Statistics
- **Total Files**: 65 files
- **Frontend Components**: 35 UI components + 8 feature components
- **Backend Modules**: 7 server files
- **Test Files**: 6 test suites
- **Configuration Files**: 9 config files

### Architecture Highlights
- **Component-Driven Architecture**: Modular React components with shadcn/ui
- **Type-Safe Backend**: Express.js with TypeScript and Drizzle ORM
- **Modern Tooling**: Vite, Tailwind CSS, React Query, and Vitest
- **AI Integration**: OpenAI GPT-4o for content generation and analytics
- **Authentication**: Replit OAuth with session management
- **Database**: PostgreSQL with Drizzle ORM for type safety
