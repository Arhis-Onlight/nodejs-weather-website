const request = require('request'); 

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiYXJoaXMiLCJhIjoiY2p3aTZiZ3RrMDQ0NjRhbzVyN2F5cmZjZyJ9.KlzPVtqFKri1qrnnrvzI8g&limit=1`;
    request({url, json: true}, (error, {body} = {})=>{
        if(error) {
            return callback('Unable to connect to location services!', undefined);
        }

        if(body.features.length === 0) {
            return callback('Unable to find the location', undefined); 
        }

        callback(undefined, {
            lontitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name,
        });
    })
}

module.exports = geocode;