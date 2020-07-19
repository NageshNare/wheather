import React, { Component } from 'react';
import './App.css';
import Weather from './app_component/wheather.component';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './app_component/form.component';

const API_Key = "4c667218a0211b9c4675dd227c0026f3"

class App extends Component{

  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    
    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmoshphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };

  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  get_weatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weathericon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 331:
        this.setState({icon: this.weathericon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weathericon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weathericon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weathericon.Atmoshphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weathericon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weathericon.Clouds});
        break;
      default:
        this.setState({icon: this.weathericon.Clouds})

    }
  }
  

  getWeather = async (e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
    const response = await api_call.json();

    console.log(response);
    this.setState({
      city: response.name,
      country:response.sys.country,
      celsius: this.calCelsius(response.main.temp),
      temp_min: this.calCelsius(response.main.temp_min),
      temp_max: this.calCelsius(response.main.temp_max),
      description: response.weather[0].description
    });
    this.get_weatherIcon(this.weathericon, response.weather[0].id);
    }
    else{
      this.setState({error: true})
    }
  }

 render(){
  return (
    <div className="App">
      <Form onload={this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city}
       country={this.state.country}
       temp_celsius={this.state.celsius}
       temp_min={this.state.temp_min}
       temp_max={this.state.temp_max}
       description={this.state.description}
       weathericon={this.state.icon}

       />
    </div>
  );

 }
  
}

export default App;
