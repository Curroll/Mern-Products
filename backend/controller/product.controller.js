import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req, res)=>{
    try {
            const products = await Product.find({}).lean() ;
            res.status(200).json({success:true,data: products })
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({success:false, message: "Server Error "})
    }
    };

export const createProducts = async (req, res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
    res.status(400).json({success: false,message: "Please fill All Fields " })        
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save(); 
        res.status(201).json({success:true, data: newProduct})
    } catch (error) {
        console.log("Error in creating Product:",  error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}   

export const updateProducts = async (req, res)=>{
    const {id} = req.params;
    const product = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Id Not Found  "})
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedProduct})
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
        console.log(error.message); 
    }
    }

export const deleteProducts = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Id Not Found"})
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"product deleted"});
    } catch (error) {
        console.log(`Error ${error.message}`);
        res.status(500).json({success:false , message:"Server Error"})
    }
}    



