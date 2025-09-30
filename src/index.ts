const express = require("express")
const bodyParser = require("body-parser")
const bookRoutes = require("./routes/bookRoutes")

const app = express()
const PORT = process.env.PORT || 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/v1/books/", bookRoutes)

app.listen(PORT, () => console.log(`Libary Management system running on localhost:${PORT}`))