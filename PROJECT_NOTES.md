# PricePulse Project Notes

## Project Overview
**Name**: PricePulse
**Tagline**: Track. Compare. Save.
**Type**: Full-Stack Web Application
**Status**: Under Development (Week 1 - Frontend)

## Timeline
- **Week 1**: Frontend (React + Vite) ✅ COMPLETED
- **Week 2**: Backend (Node.js + Express)
- **Week 3**: AI Service (Python + FastAPI)

## Key Features
1. **Product Search**: Search and track products across retailers
2. **Price Tracking**: Real-time price monitoring
3. **Price Alerts**: Set target prices and get notified
4. **Dashboard**: User dashboard with tracked products and savings
5. **Multi-Language**: English, French, Spanish support
6. **Price Visualization**: Charts and graphs for price history

## Frontend Architecture

### Component Structure
```
components/
├── layout/       (Navbar, Footer, Sidebar)
├── ui/           (Button, Input, Card, Badge)
├── search/       (SearchBar, SearchResults)
├── product/      (ProductCard, PriceTable, PriceGraph)
├── alerts/       (AlertCard, AlertSetupModal)
└── auth/         (LoginForm, RegisterForm)
```

### State Management
- React Context API for Auth and Language
- Custom hooks for Search and Alerts
- Local storage for token persistence

### Routing
- /: Landing page
- /search: Product search
- /product/:id: Product details
- /dashboard: User dashboard
- /alerts: Price alerts management
- /login: Login page
- /register: Registration page

## API Endpoints (To be implemented)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/search?q=...` - Search products
- `GET /api/products/:id` - Get product details
- `GET /api/alerts` - Get user alerts
- `POST /api/alerts` - Create alert
- `DELETE /api/alerts/:id` - Delete alert

## Dependencies
**Frontend**:
- react@18.2.0
- react-router-dom@6.22.0
- axios@1.6.0
- i18next@23.7.0
- recharts@2.10.0

## Next Steps
1. Install dependencies: `npm install` in frontend folder
2. Run development server: `npm run dev`
3. Test all pages and components
4. Build backend API (Week 2)
5. Integrate with AI service (Week 3)

## Notes
- Tailwind CSS classes used for styling
- All components are functional components with hooks
- i18n setup supports EN, FR, ES translations
- API client setup with axios interceptors for token management
