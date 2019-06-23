const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');





// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const cssPath = "/css/styles.css";
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const icon = '/img/icon.png';

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use( express.static(publicDirectoryPath) ); 

//Setup some variables 
const vars = {    
    cssPath,
    name: 'Victor',
};

app.get('', (req, res) => {
    res.render('index', {
        cssPath,
        icon,
        title: 'Weather',
        name: vars.name,
    });
});



app.get('/about', (req, res) => {
    res.render('about', {
        cssPath,
        icon,
        title: 'About Me',
        name: vars.name,
    });    
});

app.get('/help', (req, res)=> {
    res.render('help', {
        cssPath,
        icon,
        title: 'Help',
        name: vars.name,
        message: "This is a message :D",
    })
})
app.get('/weather', (req, res)=>{    
    if(!req.query.address) {
        return res.send({
            error: 'Address term was not provided',
        });
    }
    geocode(req.query.address, (error, {latitude, lontitude, location} = {} ) => {
        if(error) {
            return res.send({
                error,
            });
        }

        forecast(latitude, lontitude, (error, {forecast} = {}) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast,
                location, 
                address: req.query.address,
            });
        });
    }); 
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        cssPath,
        icon,
        title: '404 page',
        message: 'The article not found',
        name: vars.name,
    });
});

app.get('*', (req, res) =>{
    res.render('404', {
        cssPath,
        icon,
        title: '404 page',
        message: 'The page not found',
        name: vars.name,
    });
});

app.listen(port, ()=> {
    console.log(`Server is up on the port ${port}`);
});
