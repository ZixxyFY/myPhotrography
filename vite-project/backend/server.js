import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// 🔗 Replace with your connection string
mongoose.connect("mongodb+srv://neeraj112005sahu_db_user:Neeraj@2005@cluster0.u1ypqyk.mongodb.net/")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running")
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})