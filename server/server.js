import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cors from "cors"
import { createServer } from "http"
import Product from "./models/productModel.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const httpServer = createServer(app)

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello, World! 👋');
});

app.get('/products',async (req,res)=>{
  try{
    const products = await Product.find()
    res.json(products)
  }
  catch(error){
    console.log("Error fetching products: ",error)
  }
})

httpServer.listen(PORT,()=>{
    console.log("Server starting at port "+PORT )
    connectDB()
})