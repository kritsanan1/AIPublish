
# Scripts Documentation

This document provides detailed information about all available NPM scripts in the Ayrshaer CMS project.

## Available Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `npm run dev` | Start development server with hot reload and TypeScript compilation | None | `npm run dev` | **Port in use**: Kill process on port 5000 with `lsof -ti:5000 \| xargs kill -9`<br>**TypeScript errors**: Run `npm run check` to see detailed errors<br>**Module not found**: Run `npm install` to ensure dependencies |
| `npm run build` | Build production-ready application (frontend + backend) | None | `npm run build` | **Build fails**: Check TypeScript errors with `npm run check`<br>**Out of memory**: Increase Node.js heap size with `NODE_OPTIONS="--max-old-space-size=4096"`<br>**Missing dependencies**: Run `npm install` |
| `npm start` | Start production server from built files | `PORT` (optional) | `PORT=3000 npm start` | **Port binding**: Ensure port is available and not firewalled<br>**Environment variables**: Check `.env` file exists and is properly configured<br>**Database connection**: Verify `DATABASE_URL` is correct |
| `npm run check` | Run TypeScript compiler type checking without emitting files | None | `npm run check` | **Type errors**: Review error output and fix type mismatches<br>**Config issues**: Check `tsconfig.json` for proper paths and includes<br>**Module resolution**: Verify import paths are correct |
| `npm run db:push` | Push database schema changes to PostgreSQL using Drizzle | None | `npm run db:push` | **Connection refused**: Verify database is running and `DATABASE_URL` is correct<br>**Permission denied**: Check database user has proper privileges<br>**Schema conflicts**: Review migration conflicts and resolve manually |
| `npm test` | Run test suite using Vitest | `--watch`, `--coverage`, `--ui` | `npm test -- --watch` | **Tests fail**: Check test environment setup in `vitest.config.ts`<br>**Import errors**: Verify test file paths and mock configurations<br>**Async issues**: Ensure proper async/await usage in tests |

## Script Details

### Development Script (`npm run dev`)
**Purpose**: Starts the development environment with hot module replacement and TypeScript compilation.

**Environment Variables**:
- `NODE_ENV=development` (automatically set)
- Uses `tsx` for TypeScript execution without compilation
- Serves both frontend and backend on port 5000

**Expected Output**:
```bash
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

[timestamp] [express] serving on port 5000
```

**Common Parameters**:
- No direct parameters, but environment variables can be set:
  ```bash
  PORT=8080 npm run dev
  DEBUG=* npm run dev
  ```

### Build Script (`npm run build`)
**Purpose**: Creates production-optimized builds for both frontend (Vite) and backend (esbuild).

**Build Process**:
1. `vite build` - Builds frontend React application
2. `esbuild server/index.ts` - Bundles backend with dependencies

**Expected Output**:
```bash
✓ built in [time]
dist/
  ├── assets/
  │   ├── index-[hash].js
  │   └── index-[hash].css
  └── index.js
```

**Build Optimization**:
- Tree shaking for unused code removal
- Minification and compression
- Asset optimization and hashing

### Database Script (`npm run db:push`)
**Purpose**: Synchronizes Drizzle schema with PostgreSQL database.

**Configuration**: Uses `drizzle.config.ts` for connection settings

**Safety Features**:
- Schema diffing to show changes before applying
- Backup recommendations for production databases
- Rollback capabilities through migration history

**Example with verbose output**:
```bash
npm run db:push -- --verbose
```

### Testing Script (`npm test`)
**Purpose**: Executes test suite using Vitest testing framework.

**Test Types Supported**:
- Unit tests (`*.test.ts`, `*.test.tsx`)
- Integration tests in `/test` directory
- Component tests with React Testing Library

**Advanced Usage**:
```bash
# Run specific test file
npm test -- components/dashboard.test.tsx

# Run tests with coverage report
npm test -- --coverage

# Run tests in UI mode
npm test -- --ui

# Run tests matching pattern
npm test -- --grep "authentication"
```

**Coverage Reports**: Generated in `/coverage` directory with HTML output

## Environment-Specific Configurations

### Development Environment
- Hot module replacement enabled
- Source maps for debugging
- Detailed error messages
- Development database connection

### Production Environment
- Optimized builds with minification
- Environment variable validation
- Health checks and monitoring
- Production database with connection pooling

## Performance Optimization

### Development Performance
- Use `--max-old-space-size` for large projects
- Enable file system watching optimizations
- Configure IDE for TypeScript performance

### Build Performance
- Utilize build caching
- Parallel processing where possible
- Incremental compilation for TypeScript

## Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use Replit Secrets for production deployment
- Validate required environment variables on startup

### Database Security
- Use connection pooling to prevent exhaustion
- Implement proper SQL injection prevention
- Regular security updates for dependencies

## Monitoring and Debugging

### Development Debugging
```bash
# Enable debug logging
DEBUG=express:* npm run dev

# Run with Node.js inspector
node --inspect $(which tsx) server/index.ts
```

### Production Monitoring
- Log aggregation and analysis
- Error tracking and alerting
- Performance metrics collection
- Health check endpoints

## Integration with Replit

### Replit-Specific Considerations
- Port forwarding configuration (5000 → 80/443)
- Environment variable management through Secrets
- Automatic dependency installation
- Built-in debugging and monitoring tools

### Deployment Integration
- Automatic builds on deployment
- Environment-specific configurations
- Health checks and rollback procedures
- CDN integration for static assets
