const { ObjectID, ObjectId } = require("bson")
const express = require("express")
const { connectToDb, getDb } = require("./mongo")
const app = express()
app.use(express.json())
let db
connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>{
            console.log("app listining at 3000")
        })
        db=getDb()
    }
})

app.get("/books",(req,res)=>{
    const page =req.query.p || 0
    const booksperpage=2 
    let books=[]
    db.collection('books')
    .find()
    .sort({author:1})
    .skip(page*booksperpage)
    .limit(booksperpage)
    .forEach(book=>books.push(book))
    .then(()=>{
        res.status(200).json(books)
    }).catch(()=>{
        res.status(500).json({error:"could not find it"})
    })
})

app.get("/books/:id",(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id:ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        }).catch(()=>{
            res.status(500).json({msg:"cant fetch the doc"})
        })
    }else{
        res.status(500).json({masg:"invalid object id"})
    }
})

app.post("/books",(req,res)=>{
    const book = req.body
    db.collection('books')
    .insertOne(book)
    .then(res=>{
        res.status(201).json(res)
    }).catch(()=>{
        res.status(500).json({msg:"couldnt post the doc"})
    })
})

app.delete("/books/:id",(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id:ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        }).catch(()=>{
            res.status(500).json({msg:"cant delete the doc"})
        })
    }else{
        res.status(500).json({masg:"invalid object id"})
    }
})

app.patch("/books/:id",(req,res)=>{
    const updates=req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id:ObjectId(req.params.id)},{$set:updates})
        .then(doc=>{
            res.status(200).json(doc)
        }).catch(()=>{
            res.status(500).json({msg:"cant update the doc"})
        })
    }else{
        res.status(500).json({masg:"invalid object id"})
    }
})