const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Boris Velikovich'
    })
})

app.get('/about', (req,res) => {
    res.render('about',  {
        title: 'About Me',
        name: 'Boris Velikovich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Reston, Virginia',
        title: 'Help',
        name: 'Boris Velikovich'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    else
    {
        const address = req.query.address

        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            forecast(longitude, latitude, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error
                        })
                    }
                    res.send({
                        address,
                        location,
                        forecast: forecastData
                    })
                })
            })
        }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Boris Velikovich'    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Boris Velikovich'   })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
