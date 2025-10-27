import { useState } from "react";
import "./App.css";
import LoadingSkelton from "./components/LoadingSkelton";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    const q = city.trim();
    if (!q) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          q
        )}&days=3`
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data?.error) {
        const msg = data?.error?.message || "City not found or API error";
        setWeather(null);
        throw new Error(msg);
      }
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      // console.log(position);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=3`
        );
        if (!response.ok) {
          setError("Unable to get weather for your location");
        }
        const data = await response.json().catch(() => null);
        setWeather(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-sans">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-gray-100">
        <h1 className="font-bold text-3xl mb-6 text-center">
          Weather App
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
            className="grow p-2 rounded-l-md border border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
          onClick={fetchWeather}
          disabled={loading}
          className="px-4 bg-blue-600 border-r-md hover:bg-blue-700 disabled:opacity-50 text-white cursor-pointer"
           >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>
        <button
         onClick={getCurrentLocation}
         disabled={loading}
         className="w-full py-2 mb-6 rounded-md bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white cursor-pointer"
         >
          Get Current Location Weather
        </button>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        { loading?(<LoadingSkelton/>):(
        weather && !error && weather.location && weather.current && (
          <div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="mb-2">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="inline-block"
              />{" "}
              {weather.current.condition.text}
            </p>
            <p>
              Temp: <span className="font-medium mr-2 text-green-400"> {weather.current.temp_c}</span>C / <span className="font-medium text-green-400">{weather.current.temp_f}</span>F
            </p>
            <p>Humidity: <span className="font-medium text-green-400">{weather.current.humidity}</span>%</p>
            <p>Wind: <span className="font-medium text-green-400">{weather.current.wind_kph}</span> kph</p>
          </div>
          {/* Forecast */}
          <div>
          <h3 className="text-xl font-semibold mb-4 text-center">3-Days Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weather.forecast.forecastday.map((day)=>(
              <div key={day.date} className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="font-semibold mb-2">{day.date}</p>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <p>{day.day.condition.text}</p>

                <p>
                  High: {" "}
                  <span className="font-medium">{day.day.maxtemp_c}C</span>
                  /{" "}
                  <span className="font-medium">{day.day.maxtemp_f}F</span>
                </p>

                    <p>
                  Low: 
                  {" "}
                  <span className="font-medium">{day.day.mintemp_c}C</span>
                  /{" "}
                  <span className="font-medium">{day.day.mintemp_f}F</span>
                </p>
                <p>Humadity: {day.day.avghumidity}%</p>
              </div>
            ))}
          </div>
          </div>
          </div>
       ) )}
      </div>
    </div>
  );
}

export default App;
