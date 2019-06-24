const request = require('request');

const forecast = (lontitude, latitude, callback) =>{
    const url = `https://api.darksky.net/forecast/91ba1d38a032c1649522f5b4f14d5c0c/${lontitude},${latitude}?units=si&lang=en`;
    request({url, json: true}, (error, {body})=>{
        if(error) {
            return callback('Unable to connect to weather service!', undefined);     
        }
    
        if(err = body.error) {
            return callback(err, undefined);
        }       
        callback(undefined, {
            forecast: `${body.daily.data[0].summary} Temperature now is about ${body.currently.temperature}°C. Minimum is ${body.daily.data[0].apparentTemperatureLow}°C, Maximum: ${body.daily.data[0].apparentTemperatureHigh}°C. And a chance of rain is about ${body.currently.precipProbability}%`
        }); 
        
    });
}

module.exports = forecast;