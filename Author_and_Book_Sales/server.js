require('dotenv').config()
const db=require('./config/db')
const express=require('express')

const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())





app.use('/api/author',require('./routes/author.route'))
app.use('/api/book',require('./routes/book.route'))
app.use('/api/sale',require('./routes/sales.route'))

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running On http://127.0.0.1:${process.env.PORT}`)
    db.ConnectDb();

})