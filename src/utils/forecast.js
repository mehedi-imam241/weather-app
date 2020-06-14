const request = require('request')

const forecast = (latitude, longitude, callback) => {

    url = 'https://api.darksky.net/forecast/1f44ac15c9e6298126678851697555bb/'+encodeURIComponent(latitude.toString())+','+encodeURIComponent(longitude.toString())+'?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No connection', undefined)
        }
        else if (body.error) {
            callback(body.error, undefined)
        }
        else {
            callback(undefined, body.currently.summary+". Temperatre: " +
                body.currently.temperature +
                " degree celcius. There is " +
                body.currently.precipProbability +
                "% chance of Rain.")
        }
    })
}

module.exports = forecast