const request = require('request')


const forecast = (longitude, latitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/95b515d409514acc4039691341c353d9/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.error) {
            callback("Unable to find location.", undefined)
         }
        else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " chance of rain. The high today is " + body.daily.data[0].temperatureHigh + "F. The low today is " + body.daily.data[0].temperatureLow + "F.")
        }
    })
}

module.exports = forecast