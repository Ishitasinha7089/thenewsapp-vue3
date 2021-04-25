
class WeatherForecast {
    constructor() {
        this.temperatureValue = 0;
        this.temperatureHigh = 0;
        this.temperatureLow = 0;

        this.location = ' ';
        this.update();
    }
    update() {
        if (navigator.onLine) {
            navigator.geolocation.getCurrentPosition(position => this.updateForecast(position));
        }
    }

    async updateForecast(position) {
        let data = null;

        try {
            data = await this.getForecast(position.coords);
        } catch (e) {
            data = this.getErrorData();
        }

        this.populate(data);
    }
    async getForecast(coordinates) {
        let appId = your_api_id;
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}&units=metric`;

        let response = await fetch(endpoint);

        return await response.json();
    }

    getErrorData() {
        return {
                main: {
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0,
                },
                weather: [
                    {
                        id: 0,
                        description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
                    }
                ],
                name: null,
                sys: {
                    country: null
                }
            };
    }

    populate(data) {
      
        this.temperatureValue = Math.round(data.main.temp);
        this.temperatureHigh = Math.round(data.main.temp_max);
        this.temperatureLow = Math.round(data.main.temp_min);
        this.location = this.formatLocation(data.name, data.sys.country);
    }
    formatLocation(city, country) {
        if (city === null && country === null) {
            return '';
        }

        return `${city}, ${country}`;
    }

}

export default WeatherForecast;
