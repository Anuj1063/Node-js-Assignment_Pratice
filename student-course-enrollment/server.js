require('dotenv').config()
const db=require('./config/db')
const express=require('express')

const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())





app.use('/api/student',require('./routes/student.route'))
app.use('/api/course',require('./routes/course.route'))
app.use('/api/enrollment',require('./routes/enrollment.route'))

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running On http://127.0.0.1:${process.env.PORT}`)
    db.ConnectDb();

})