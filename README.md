# PricePulse - Full Stack Price Tracking Application

## Project Structure

### Frontend (React + Vite)
- **public/**: Static assets
- **src/**:
  - `components/`: Reusable UI components organized by feature
  - `pages/`: Page components (Landing, Dashboard, Search, etc.)
  - `context/`: React Context for state management (Auth, Language)
  - `hooks/`: Custom React hooks (useSearch, useAlerts)
  - `services/`: API client and service functions
  - `utils/`: Utility functions (formatPrice, etc.)
  - `i18n/`: Internationalization (English, French, Spanish)
  - `App.jsx`: Main app component with routing
  - `main.jsx`: Entry point
  - `index.css`: Global styles

### Backend (Node.js - Week 2)
- Express.js REST API
- MongoDB for database
- JWT authentication
- Price scraping and tracking

### AI Service (Python - Week 3)
- FastAPI service
- Machine learning models
- Price predictions
- Recommendations

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Backend (Coming in Week 2)
```bash
cd backend
npm install
npm run dev
```

### AI Service (Coming in Week 3)
```bash
cd ai-service
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

## Tech Stack
- **Frontend**: React 18, Vite, React Router, i18next, Recharts
- **Backend**: Node.js, Express, MongoDB, JWT
- **AI**: Python, FastAPI, scikit-learn, pandas
- **Styling**: Tailwind CSS utilities

## Features
✅ Real-time price tracking
✅ Multi-language support (EN, FR, ES)
✅ Price alerts and notifications
✅ User authentication
✅ Product comparison
✅ Price history visualization
✅ AI-powered recommendations
