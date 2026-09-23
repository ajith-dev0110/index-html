# Weather App – Personalized Weather & Travel Tips (Backend API)

RESTful API built with Node.js, Express, and MongoDB that powers real-time weather delivery, dynamic AI-driven travel tip generation, and secure user data management.

## API Endpoints

### 1. Authentication (Public & Protected)
- `POST /api/auth/signup` - Register a new user (`name`, `email`, `password`)
- `POST /api/auth/login` - Verify credentials and return JWT
- `GET /api/auth/me` - Return logged-in user's profile (Protected: `Authorization: Bearer <token>`)

### 2. Weather Data Integration (Public)
- `GET /api/weather?city={cityName}` - Current weather for a named city
- `GET /api/weather?lat={lat}&lon={lon}` - Current weather from geolocation coordinates
- `GET /api/weather/forecast?city={cityName}` - 5-day forecast for a named city

### 3. AI-Powered Travel Tips (Protected)
- `POST /api/travel-tips` - Dynamic packing suggestions, activity recommendations, and safety advisories

### 4. Saved Cities Dashboard (Protected CRUD)
- `POST /api/cities` - Save city to favourites (`{ city, country, lat, lon }`)
- `GET /api/cities` - List saved cities with fresh live weather snapshots
- `DELETE /api/cities/:id` - Remove a saved city

### 5. Search History (Protected)
- `POST /api/history` - Log a search
- `GET /api/history` - Return user's recent searches (capped 10–20, newest first)

## Setup & Running Locally
1. Clone / extract repository
2. Run `npm install`
3. Create `.env` file based on `.env.example`
4. Run `npm run dev` or `npm start`
