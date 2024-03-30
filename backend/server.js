const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')
const Board = require('./models/boardSchema')


const SECRET_KEY = 'secretkey'

//connect to express app
const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://tayudin707:8a8zomlq2azj56BB@cluster30.kgldebi.mongodb.net/UsersDB?retryWrites=true&w=majority'
mongoose
.connect(dbURI)
.then(() =>{
    app.listen(3001, () =>{
        console.log('SERVER IS CONNECT TO PORT 3001 AND CONNECT MONGODB')
    })
})
.catch((error) => {
    console.log(' Unable to connect to server or mongodb')
})

//middleware
app.use(bodyParser.json())
app.use(cors())

//Create new board
app.post('/test', async (req,res) =>{ 
    try{
        const { username,name,columns } = req.body 
        const Owner = username
        const isActive = false
        const newBoard = new Board({ Owner,name,isActive,columns}) 
        await newBoard.save()
        const response = await Board.find({Owner: username})
        res.json(response)
        
    }catch (error) {
        
    }
})

//Delete board
app.post('/test2', async (req,res) =>{

    try{

        const {name} = req.body
        console.log(name)
        await Board.findOneAndDelete({name:name})
        res.json({ message: 'Success to Delete'})

    }catch(error){
        res.json({ message: 'Error to Delete'})
    }
})


//REGISTER
app.post('/register', async (req,res) =>{ //using express app to make a post req at that path
    try{
        const {email,username,password} = req.body //กำหนด body ให้กับ request
        const hashedPassword = await bcrypt.hash(password,10) //นำ password มาเข้ารหัส
        const newUser = new User({ email,username,password: hashedPassword }) 
        await newUser.save() //ใช้ save method เพื่อบันทึก
        res.status(201).json({ message: 'User Created Successfully'}) //ตอบสนองด้วย status 201 ด้วย json format
    }catch (error) {
        res.status(500).json({ error: 'Error Signing Up'}) //ตอบสนองด้วย status 500 ด้วย json format
    }
})

//GET REGISTERED USERs
app.get('/register', async (req,res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    }catch(error) {
        res.status(500).json({error: 'Unable to get users'})
    }
})

//LOGIN 
app.post('/login', async (req,res) => { //สร้างข้อมูลใน /login
    try{

        const { username,password} = req.body //ซึ่งจะสร้าง username และ password 
        const user = await User.findOne({username}) //ใช้ findone method เพื่อค้นหา username ไปเก็บไว้ในตัวแปร user
        if(!user){ //ใช้ตรวจสอบว่ามี username นั้นหรือไม่
            return res.status(401).json({error: 'invalid credentials'}) 
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){ //ใช้ตรวจสอบว่า password ถูกต้องหรือไม่
            return res.status(401).json({ error: 'invalid credentials'}) 
        }
        const token = jwt.sign({ userId: user._id}, SECRET_KEY, {expiresIn: '1hr'})
        res.json({token})  
        
    } catch(error) {
        res.status(500).json({ error: 'Error logging in'})
    }
})

//get board
app.post('/account', async (req,res) => {
    try{

        const {username} = req.body
        const response = await Board.find({Owner: username})
        res.json(response)

    }catch(error){
        console.log('get board failed')
    }
})

//update board
app.put('/account', async (req,res) => {

    try{

        const {_id,name,columns} = req.body
        const result = await Board.findOneAndUpdate({_id:Object(_id)},{name:name},{new: true})
        const result2 = await Board.findOneAndUpdate({_id:Object(_id)},{columns:columns},{new: true})
        res.json(result)
        
    }catch(error){

    }
})

//share board
app.put('/share' , async (req,res) =>{

    try{

        const {_id,username} = req.body
        const result = await Board.findOneAndUpdate({_id:Object(_id)},{ $addToSet: {Owner: username} },{new: true})
        res.json({ message: 'Share successfully'})
        

    }catch(error){
        res.json({ message: 'Share failed'})
    }
})

//make request
app.post('/request', async (req,res) => {
    try{

        const {_id,username,boardname,sender} = req.body
        const result = await User.findOneAndUpdate({username:username},{ $addToSet: {request: {boardname,sender,_id}}},{new: true})
        res.json({ message: 'Make request successful'})
        console.log(result)

    }catch(error){
        res.json({ message: 'Make request failed'})
    }
})

app.put('/request', async (req,res) => {
    try{

        const {username,boardname} = req.body
        const result = await User.findOneAndUpdate({ username:username },{ $pull: { request: { boardname: boardname } } },{ new: true })
        res.json({ message: 'Make request successful'})
        console.log(result)

    }catch(error){
        res.json({ message: 'Make request failed'})
    }
})








// Create //POST REQ
// Read //GET REQ
// Update //PUT OR PATCH REQ
// Delete //DELETE REQ