const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))   //here i am using statice css and javascript

const partialspath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)

app.get('',(req,res)=> {
    res.render('', {
        title: 'Weather',
        description: 'Get your weather!',
        name: 'Mehedi Imam'
    })
})
app.get('/about',(req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Mehedi Imam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Docs',
        description: 'Navigate to weather to know',
        name: 'Mehedi Imam'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'No address has been provided.'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,placeName}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=> {
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({
                placeName,
                forecastdata,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: 'Error!',
        message: 'Help article not found.',
        name: 'Mehedi Imam'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title: 'Error!',
        message: 'Page not found.',
        name: 'Mehedi Imam'
    })
})

app.listen(3000,() => {
    console.log('Server is on port 3000')
})