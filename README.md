# Weather App (Vite + React)

A modern and simple weather application built with **React + Vite** and styled using **Tailwind CSS**. It allows users to search for weather data by city name or fetch weather information based on their **current location** using the **Geolocation API**. The app displays the **current weather** and a **3-day forecast**, along with a beautiful loading skeleton while fetching data.

## ✨ Features
- Search weather by city name (with 3-day forecast)
- Get weather based on the user’s current location
- Smooth loading skeleton animation
- Clear error messages for API and geolocation issues
- Clean and modern dark UI using Tailwind CSS

## 🧰 Tech Stack
- React (Vite)
- Tailwind CSS
- WeatherAPI.com (Forecast API)
- Geolocation API (HTML5)

## 📦 Installation

### 1. Requirements
- Node.js 18+
- Free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### 2. Clone and Install
```bash
git clone https://github.com/<your-username>/weather-app.git
cd weather-app
npm install
```
### 3. Environment Setup
- Create a .env.local file in the project root:
- VITE_WEATHER_API_KEY=your_weather_api_key_here
- You can also include a public .env.example:
- VITE_WEATHER_API_KEY=your_weather_api_key_here

### 4. Run the App
- npm run dev
- Open your browser at http://localhost:5173

### 5. Build for Production
- npm run build

## 🗺️ Geolocation Notes
- Works only on HTTPS or localhost
- If location permission is denied, the app shows a helpful error message
- Inside iframes, ensure you use allow="geolocation"

## 🧩 Main Components
- App.jsx — Core logic for fetching and displaying weather
- LoadingSkelton.jsx — Animated loading placeholders
- App.css — Basic layout and Tailwind configuration

## 🧪 Example API Requests
- By City:
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=3`);
- By Coordinates:
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=3`);
});

## 🐞 Common Issues
- “Geolocation is not supported” → Your browser or connection is not secure (use HTTPS)
- “Permission denied” → Enable location permission manually
- API errors (400/401) → Verify your WeatherAPI key and query format
- CORS issues → Use HTTPS and a valid WeatherAPI domain

## 🚀 Deployment (Vercel / Netlify)
- Push your code to GitHub
- Connect your repo to Vercel or Netlify
- Add environment variable VITE_WEATHER_API_KEY
- Deploy the project

## 📁 Project Structure
.
├── src/
│   ├── components/
│   │   └── LoadingSkelton.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
└── tailwind.config.js

