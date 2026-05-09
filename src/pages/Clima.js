import { useEffect, useState, useCallback } from "react";
import "./Clima.css";

const Clima = () => {
  const [ciudad, setCiudad] = useState("Buenos Aires");
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarClima = useCallback(async () => {
    try {
      setLoading(true);

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es&format=json`,
      );

      const geoData = await geoResponse.json();

      if (!geoData.results) {
        setClima(null);
        return;
      }

      const lugar = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lugar.latitude}&longitude=${lugar.longitude}&current_weather=true`,
      );

      const weatherData = await weatherResponse.json();

      setClima({
        ciudad: lugar.name,
        pais: lugar.country,
        temperatura: weatherData.current_weather.temperature,
        viento: weatherData.current_weather.windspeed,
        hora: weatherData.current_weather.time,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ciudad]);

  useEffect(() => {
    buscarClima();
  }, [buscarClima]);

  return (
    <section className="clima-page">
      <div className="clima-container">
        <h1 className="clima-title">Weather Explorer</h1>

        <p className="clima-subtitle">
          Search weather conditions around the world
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search city..."
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />

          <button onClick={buscarClima}>Search</button>
        </div>

        {loading ? (
          <h2 className="loading">Loading weather...</h2>
        ) : (
          clima && (
            <div className="weather-card-clima">
              <div className="weather-main">
                <div className="weather-top">
                  <div>
                    <h2>{clima.ciudad}</h2>

                    <p>{clima.pais}</p>
                  </div>

                  <span>☀️</span>
                </div>

                <h1 className="weather-temp">{clima.temperatura}°C</h1>
              </div>

              <div className="weather-info">
                <div>
                  <h3>Wind</h3>

                  <p>{clima.viento} km/h</p>
                </div>

                <div>
                  <h3>Updated</h3>

                  <p>{clima.hora}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Clima;
