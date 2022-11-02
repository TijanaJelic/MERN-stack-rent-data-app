require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const rentDataRoutes = require('./routes/rentData')

const app = express()

// middleware
app.use(express.json()) // if req has body it will be passed to the req object so we can use req.body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/rentData', rentDataRoutes)

// connect to db
mongoose.connect(process.env.RENTDATA_DB_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT || 5000, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
    })
    .catch((err) => {
        console.log(err)
    })

