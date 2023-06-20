const express = require('express')
const connectToMongo=require("./db")
const app = express()
const port = 5000
connectToMongo()
// Middleware so that routes can send json objects easily before parsing
app.use(express.json());


app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})