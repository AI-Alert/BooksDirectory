require('dotenv').config()
const express = require("express")
const dbConnect = require("./db_connect")
const router = require("./routes/index")

dbConnect();

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/api', router)

const start = async () =>  {
    try{
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} port...`) } )
    }catch (e) {
        console.log(e);
    }
}

start()