
# Ayrshaer CMS - Site Navigation Map

## Application Sitemap

This document provides a comprehensive overview of all routes, pages, and navigation flows within the Ayrshaer CMS application.

### 🌐 Public Routes

#### Landing & Authentication
```
/ (Root)
├── /landing                    # Landing page for unauthenticated users
├── /login                      # Login redirect (handled by Replit Auth)
├── /logout                     # Logout endpoint
└── /auth/callback              # OAuth callback from Replit
```

### 🔐 Authenticated Routes

#### Main Application Structure
```
/app
├── /dashboard                  # Main dashboard (default after login)
├── /content-management         # Content creation and management
├── /analytics                  # Analytics and insights dashboard
├── /ai-tools                   # AI-powered content generation tools
├── /payments                   # Subscription and payment management
├── /user-management           # User profile and account settings
└── /404                       # Not found page
```

## Detailed Page Structure

### 📊 Dashboard (`/dashboard`)
**Purpose**: Central hub showing overview metrics and quick actions
**User Flow**: Login → Dashboard (default landing)

**Key Components**:
- Statistics cards (articles, views, users, revenue)
- Recent activity feed
- Analytics charts
- Quick action buttons

**Navigation Options**:
- All main sections accessible via sidebar
- Quick create buttons for new content
- User profile dropdown

### 📝 Content Management (`/content-management`)
**Purpose**: Create, edit, and manage articles, images, and products
**User Flow**: Dashboard → Content Management

**Sub-sections**:
- **Articles Tab**: 
  - Article listing with filters
  - Create new article button
  - Edit/delete actions
  - Status management (draft/published)
  
- **Images Tab**:
  - Image gallery view
  - Upload new images
  - Image metadata management
  - Association with articles

- **Products Tab**:
  - Product catalog management
  - Product creation/editing
  - Inventory tracking
  - Category management

**Actions Available**:
- Create new content (articles/images/products)
- Edit existing content
- Delete content (with confirmation)
- Bulk operations
- Import/export functionality

### 📈 Analytics (`/analytics`)
**Purpose**: Data insights and performance metrics
**User Flow**: Dashboard → Analytics

**Analytics Sections**:
- **Overview Metrics**:
  - Total articles, views, users, revenue
  - Growth trends and percentages
  - Time-based comparisons

- **Content Performance**:
  - Top performing articles
  - View statistics
  - Engagement metrics
  - Content effectiveness

- **User Analytics**:
  - User growth trends
  - Activity patterns
  - Geographic distribution
  - Retention metrics

- **Revenue Analytics**:
  - Subscription metrics
  - Payment trends
  - Revenue projections
  - Conversion rates

### 🤖 AI Tools (`/ai-tools`)
**Purpose**: AI-powered content generation and analysis
**User Flow**: Dashboard → AI Tools

**AI Features**:
- **Content Generator**:
  - Article generation
  - Product descriptions
  - Social media content
  - Email templates

- **Content Analysis**:
  - SEO score analysis
  - Readability assessment
  - Sentiment analysis
  - Optimization suggestions

- **Predictive Analytics**:
  - Content performance predictions
  - User growth forecasts
  - Revenue projections
  - Market trend analysis

### 💳 Payments (`/payments`)
**Purpose**: Subscription management and payment processing
**User Flow**: Dashboard → Payments

**Payment Sections**:
- **Subscription Status**:
  - Current plan information
  - Usage statistics
  - Upgrade/downgrade options
  - Billing cycle details

- **Payment History**:
  - Transaction records
  - Invoice downloads
  - Payment method management
  - Refund requests

- **Billing Management**:
  - Update payment methods
  - Change billing address
  - Tax information
  - Auto-renewal settings

### 👤 User Management (`/user-management`)
**Purpose**: User profile and account settings
**User Flow**: Dashboard → User Management

**Management Sections**:
- **Profile Information**:
  - Personal details
  - Profile picture
  - Contact information
  - Preferences

- **Account Security**:
  - Password management (OAuth handled)
  - Session management
  - Login history
  - Account deletion

- **Notifications**:
  - Email preferences
  - Push notification settings
  - Frequency controls
  - Content alerts

## Navigation Flow Patterns

### 🎯 Primary Navigation Flow
```
Login/Landing → Dashboard → Feature Pages → Back to Dashboard
```

### 🔄 Content Creation Flow
```
Dashboard → Content Management → Create New → Edit → Publish → Analytics
```

### 🚀 AI Content Flow
```
Dashboard → AI Tools → Generate Content → Review → Content Management → Publish
```

### 💰 Subscription Flow
```
Dashboard → Payments → Upgrade Plan → Stripe Checkout → Confirmation → Dashboard
```

## User Journey Mapping

### 👤 New User Journey
1. **Landing Page** → Learn about features
2. **Login** → Replit OAuth authentication
3. **Dashboard** → First-time user onboarding
4. **Content Management** → Create first article
5. **AI Tools** → Experience AI features
6. **Analytics** → View performance metrics

### 👨‍💼 Content Creator Journey
1. **Dashboard** → Quick overview
2. **AI Tools** → Generate content ideas
3. **Content Management** → Create/edit articles
4. **Analytics** → Monitor performance
5. **Repeat cycle** → Continuous content creation

### 👑 Premium User Journey
1. **Dashboard** → Advanced metrics
2. **AI Tools** → Full AI capabilities
3. **Analytics** → Predictive insights
4. **Payments** → Manage subscription
5. **Advanced Features** → Export, bulk operations

## Mobile Navigation

### 📱 Mobile-Responsive Design
- **Bottom Navigation**: Primary sections for easy thumb access
- **Hamburger Menu**: Secondary options and settings
- **Swipe Gestures**: Content navigation and actions
- **Touch-Friendly**: Larger touch targets and spacing

### 📱 Mobile-Specific Flows
- **Quick Actions**: Fast content creation
- **Simplified Views**: Focused single-task screens
- **Offline Support**: Basic functionality when disconnected

## Breadcrumb Navigation

### 🍞 Breadcrumb Examples
```
Dashboard > Content Management > Articles > Edit Article
Dashboard > Analytics > Content Performance
Dashboard > AI Tools > Content Generator > Generated Article
Dashboard > User Management > Profile Settings
```

## Search and Discovery

### 🔍 Global Search
- **Content Search**: Find articles, images, products
- **Command Palette**: Quick navigation (Cmd+K)
- **Filters**: Status, date, author, category
- **Suggestions**: Recently viewed, popular content

## Accessibility Navigation

### ♿ Accessibility Features
- **Keyboard Navigation**: Full app accessible via keyboard
- **Screen Reader**: Proper ARIA labels and landmarks
- **Focus Management**: Logical tab order and focus indicators
- **Skip Links**: Jump to main content areas

## URL Structure

### 🔗 URL Patterns
```
https://ayrshaer-cms.replit.app/
├── /dashboard
├── /content-management?tab=articles&status=published
├── /analytics?period=30d&metric=views
├── /ai-tools?tool=generator&type=article
├── /payments?section=history&page=2
└── /user-management?tab=profile
```

### 🔗 Deep Linking Support
- **Shareable URLs**: Direct links to specific content
- **State Preservation**: URL reflects current app state
- **Bookmark-Friendly**: Meaningful URLs for bookmarking

## Performance Considerations

### ⚡ Navigation Performance
- **Route-Based Code Splitting**: Lazy load page components
- **Prefetching**: Preload likely next pages
- **Caching**: Cache static navigation elements
- **Progressive Loading**: Show navigation immediately, load content progressively

This navigation map serves as the foundation for user experience design and development planning, ensuring all user paths are well-defined and accessible.
