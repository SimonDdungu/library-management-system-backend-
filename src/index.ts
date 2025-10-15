import errorHandler from "./middleware/errorHandler"
const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');
const bookRoutes = require("./routes/bookRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()
const PORT = process.env.PORT || 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use(errorHandler)
app.use("/api/v1/books", bookRoutes)
app.use("/api/v1/users", userRoutes)

app.listen(PORT, () => console.log(`Libary Management system running on localhost:${PORT}`))