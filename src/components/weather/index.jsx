import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e6cf2b8adac94e3794577d21674b6ce3`
      );
      const data = await response.json();
      if(data) {
        setWeatherData(data);
        setLoading(false)
      }
      
    } catch (e) {
        setLoading(false);
        console.log(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-us', {
        weekday: "long",
        month: "long",
        day: 'numeric',
        year: "numeric"
    })
  }

  useEffect(() => {
    fetchWeatherData('Ikorodu');
  }, [])

  console.log(weatherData);
  if(loading){
    return <div className="loading">Loading data please wait</div>
  }
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        <div>
            <div className="city-name">
                <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
            </div>
            <div className="date">
                <span>{getCurrentDate()}</span>
            </div>
            <div className="temp">
                <h2>Temperature: {weatherData?.main?.temp}</h2>
            </div>
            <div className="pressure">
               <h3>Pressure: {weatherData?.main?.pressure}</h3> 
            </div>
            <div className="humidity">
                <h4>Humidity: {weatherData?.main?.humidity}</h4>
            </div>
            <p className="description">
                {
                    weatherData &&  weatherData.weather &&weatherData.weather[0] ? weatherData.weather[0].description : ""
                }
            </p>
            <div className="weather-info">
                <div>
                    <div>
                    <p className=""> Wind Speed : {weatherData?.wind?.speed}</p>
                    </div>
                </div>
            </div>
        </div>
      }
    </div>
  );
}
