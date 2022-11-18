const express = require("express")
const student = require('./student')
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"API Working....!"})
})

app.get('/api/student',(req,res)=>{
    res.json(student)
})

app.post('/api/student',(req,res)=>{
    const user ={
        id:student.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }
    student.push(user)
    res.json(user)
})

app.put('/api/student/:id',(req,res)=>{
    const id = req.params.id
    let first_name= req.body.first_name
    let last_name= req.body.last_name
    let email= req.body.email

    let index = student.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })
    if(index>=0){
        const std = student[index]
        std.first_name = first_name
        std.last_name=last_name
        std.email=email
        res.json(std)
    }else{
        res.status(404)
    }
})

app.delete('/api/student/:id',(req,res)=>{
    let id = req.params.id
    let index = student.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })
    if(index>=0){
        let std=student[index]
        student.splice(index,1)
        res.json(std)
    }else{
        res.status(404)
    }

})





app.listen(4444, () => {
    console.log("Server is Listening on port 4444")
})