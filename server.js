if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
const path = require('path')

app.use('/', indexRouter)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('DB connected'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port', process.env.PORT)
})
