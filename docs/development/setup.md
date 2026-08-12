# Development Setup

Complete guide to setting up your development environment for JSON Visualization.

## Prerequisites

### Required

**Node.js**
- Version: >= 24.x
- Download: [nodejs.org](https://nodejs.org/)
- Verify: `node --version`

**pnpm**
- Package manager (faster than npm)
- Install: `npm install -g pnpm`
- Verify: `pnpm --version`

**Git**
- Version control
- Download: [git-scm.com](https://git-scm.com/)
- Verify: `git --version`

### Recommended

**VS Code**
- Code editor
- Download: [code.visualstudio.com](https://code.visualstudio.com/)

**VS Code Extensions**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Styled Components

## Installation

### 1. Clone Repository

```bash
# Clone from GitHub
git clone https://github.com/HoangDuonng/Json_Visualization.git

# Navigate to directory
cd Json_Visualization
```

### 2. Install Dependencies

```bash
# Install all packages
pnpm install
```

This installs:
- Next.js and React
- TypeScript
- Zustand (state management)
- Styled-components
- Mantine UI components
- Monaco Editor
- And all other dependencies

### 3. Environment Variables

Create `.env.local` file:

```bash
# Copy example
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Node limit (default: 1000)
NEXT_PUBLIC_NODE_LIMIT=1000

# Add other variables as needed
```

### 4. Start Development Server

```bash
# Start dev server
pnpm dev
```

Open [http://localhost:3979](http://localhost:3979)

## Development Commands

### Running the App

```bash
# Development mode (hot reload)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Analyze bundle size
pnpm analyze
```

### Code Quality

```bash
# Run all checks (TypeScript + ESLint + Prettier)
pnpm lint

# Auto-fix issues
pnpm lint:fix

# TypeScript check only
pnpm type-check
```

### Testing

**Note:** Project currently has no test suite.

```bash
# No tests available
# Add tests if needed
```

## Project Structure

```
Json_Visualization/
├── .agents/skills/          # Agent Skills documentation
├── .github/               # GitHub config
├── .next/                 # Next.js build output (generated)
├── node_modules/          # Dependencies (generated)
├── public/                # Static assets
│   └── assets/           # Images, fonts
├── src/                   # Source code
│   ├── pages/            # Next.js pages (routing)
│   ├── components/       # Reusable components
│   ├── features/         # Feature modules
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── types/            # TypeScript types
│   ├── constants/        # Constants
│   └── enums/            # Enumerations
├── .env.local             # Environment variables (create this)
├── .eslintrc.json         # ESLint config
├── .prettierrc            # Prettier config
├── next.config.js         # Next.js config
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # Project readme
```

## Configuration Files

### TypeScript (`tsconfig.json`)

Strict mode enabled:
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### ESLint (`eslint.config.mjs`)

Rules enforced:
- TypeScript strict checks
- React hooks rules
- Import order
- Type-only imports
- No unused variables

### Prettier (`.prettierrc`)

Formatting rules:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

### Next.js (`next.config.js`)

Configuration:
- Webpack customization
- Bundle analyzer
- Environment variables
- Image optimization

## Editor Setup

### VS Code

**Recommended settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**Recommended extensions** (`.vscode/extensions.json`):

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "styled-components.vscode-styled-components",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Other Editors

**WebStorm:**
- Enable ESLint
- Enable Prettier
- Set Node.js version

**Vim/Neovim:**
- Install CoC or LSP
- Configure ESLint and Prettier
- Set up TypeScript support

## Common Issues

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
pnpm dev -- -p 3001
```

### Module Not Found

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm dev
```

### TypeScript Errors

**Error:** Type errors in editor

**Solution:**
```bash
# Restart TypeScript server (VS Code)
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or run type check
pnpm type-check
```

### Build Fails

**Error:** Build errors

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build

# Check for errors
pnpm lint
```

## Development Workflow

### 1. Create Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

Edit files in `src/`

### 3. Test Locally

```bash
# Run dev server
pnpm dev

# Check in browser
# http://localhost:3000
```

### 4. Lint and Format

```bash
# Fix issues
pnpm lint:fix

# Verify
pnpm lint
```

### 5. Build

```bash
# Test production build
pnpm build
pnpm start
```

### 6. Commit

```bash
git add .
git commit -m "feat: add my feature"
```

### 7. Push

```bash
git push origin feature/my-feature
```

## Hot Reload

Development server supports hot reload:
- **Fast Refresh**: React components reload instantly
- **CSS**: Styles update without refresh
- **TypeScript**: Type errors show in browser

**Note:** Some changes require full reload:
- Next.js config changes
- Environment variable changes
- New dependencies

## Debugging

### Browser DevTools

**Chrome/Edge:**
1. Press `F12`
2. Go to Sources tab
3. Set breakpoints
4. Refresh page

**React DevTools:**
- Install extension
- Inspect component tree
- View props and state

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Console Logging

```typescript
// Debug state
console.log("State:", state);

// Debug props
console.log("Props:", props);

// Debug errors
console.error("Error:", error);
```

## Performance Profiling

### React DevTools Profiler

1. Install React DevTools
2. Open Profiler tab
3. Click record
4. Interact with app
5. Stop recording
6. Analyze flame graph

### Chrome Performance

1. Open DevTools
2. Go to Performance tab
3. Click record
4. Interact with app
5. Stop recording
6. Analyze timeline

### Bundle Analysis

```bash
# Analyze bundle size
pnpm analyze

# Opens visualization in browser
```

## Environment Variables

### Available Variables

```env
# Node limit
NEXT_PUBLIC_NODE_LIMIT=1000

# Add custom variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Note:** Variables must start with `NEXT_PUBLIC_` to be available in browser.

### Using Variables

```typescript
// In code
const nodeLimit = process.env.NEXT_PUBLIC_NODE_LIMIT || 1000;
```

## Docker Development

### Using Docker

```bash
# Build image
docker compose build

# Run container
docker compose up

# Access at http://localhost:8888
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3'
services:
  app:
    build: .
    ports:
      - "8888:3000"
    volumes:
      - .:/app
      - /app/node_modules
```

## Tips

**Fast development:**
- Use hot reload
- Keep dev server running
- Use ESLint auto-fix
- Use Prettier on save

**Avoid issues:**
- Run `pnpm lint` before commit
- Test build before PR
- Clear cache if issues
- Keep dependencies updated

**Stay organized:**
- Follow project structure
- Use consistent naming
- Add comments for complex code
- Update docs when needed

## Next Steps

- Read [Architecture](docs/development/architecture.md)
- Review [Code Style](docs/development/code-style.md)
- Check [Contributing Guide](../CONTRIBUTING.md)
- Explore [Agent Skills](.agents/skills/json-visualization-dev/SKILL.md)

## Getting Help

**Issues?**
- Check [Troubleshooting](docs/troubleshooting.md)
- Search [GitHub Issues](https://github.com/HoangDuonng/Json_Visualization/issues)
- Ask in [Discussions](https://github.com/HoangDuonng/Json_Visualization/discussions)

**Questions?**
- Read [FAQ](docs/faq.md)
- Check [Documentation](docs/)
- Ask maintainers
