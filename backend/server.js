import dotenv from "dotenv";
import express from "express";
import path from "path"
import { connectDB } from "./config/db.js";
dotenv.config();
import productRoutes from '../backend/routes/product.route.js'



const app = express();
app.use(express.json());   
const PORT = process.env.PORT || 6001;

const __dirname = path.resolve(); 



app.use('/api/products',productRoutes);
app.get("/api/status", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running!" });
  });
  
 
try {
    if (process.env.NODE_ENV === "production") {
        const frontendPath = path.join(__dirname, "/frontEnd/dist");
    
        app.use(express.static(frontendPath));
    
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "frontEnd","dist", "index.html"));
        });
    
        console.log("Serving frontend from:", frontendPath);
    }
} catch (error) {
    console.error(error.message);
}




app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});