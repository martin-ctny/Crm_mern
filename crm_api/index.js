const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000
const customerRouter = require('./src/routers/customer.router')
const invoiceRouter = require('./src/routers/invoice.router')
const userRouter = require('./src/routers/user.router')
const connect = require('./config/mongoose.config')
const cors = require('cors')

connect()

app.use(express.json())
app.use(cors())


// Routes express
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", customerRouter)

app.use("/api", invoiceRouter)

app.use("/api", userRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})