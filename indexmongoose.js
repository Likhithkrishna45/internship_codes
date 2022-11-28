const express = require('express');
require("./configmongoose");
const Products = require('./productmongooses');

const app = express();
app.use(express.json());

app.post("/create", async (req,res)=>{
    let data = new Products(req.body);
    const result = await data.save();
    res.send(result)
})

app.get("/",async(req,res)=>{
    let data = await Products.find()
    res.json(data);
})

app.delete("/delete/:_id",async(req,res)=>{
    console.log(req.params)
    let data = await Products.deleteOne(req.params);
    res.send(data);
})

app.put("/update/:_id",async(req,res)=>{
    console.log(req.params);
    let data = await Products.updateMany(req.params,{$set:req.body});
    res.send(data);
})


app.listen(5000, () => {
    console.log("Server is Listening on port 5000")
})