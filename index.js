const express = require('express')
const app = express()

const HomePage = require('./http/home')
const TrackingPage = require('./http/trk')
const ABPage = require('./http/report')

// Register Pages
app.use(HomePage)
app.use(TrackingPage)
app.use(ABPage)

app.listen(8080, () => console.log(`App running on: http://localhost:8080`))
