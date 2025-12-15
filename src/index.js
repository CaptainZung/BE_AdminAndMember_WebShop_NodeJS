const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api',require('./router.js'))
app.use('/public/uploads/admin',express.static(path.join(__dirname,'..','public','uploads','admin')))
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})