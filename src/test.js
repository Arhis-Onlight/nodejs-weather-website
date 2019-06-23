const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use( express.static(publicDirectoryPath) );

app.get('', (req, res)=>{
    res.render('test', {
        title: 'Just a little test',
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address property provided',
        });
    }

    geocode(req.query.address, (error, {latitude, lontitude, location} = {})=> {
        if(error) {
            return res.send({
                error,
            });
        }
        forecast(lontitude, latitude, (error, {forecast} = {})=> {
            if(error) {
                return res.send({error});
            }
            res.send({
                forecast,
                location,
                address: req.query.address,

            });
        });
    })


});


app.listen(3000, () => {
    console.log('Listening to the port: 3000');
});
