const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require ('bcrypt');
const cors = require('cors');
const knex = require('knex');
const Signin=require('./Controllers/Signin');
const Register=require('./Controllers/Register');
const Profile=require('./Controllers/Profile');
const Image=require('./Controllers/Image');

const db = knex({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'mommydaddy',
    database : 'smart_brain'
  }
});

const app = express();

app.use(bodyparser.json())
app.use(cors())

app.get('/', (req,res)=>{
	res.json('its working!!')
})

app.post('/signin',(req,res)=>{Signin.SigninHandle(req,res,db,knex,bcrypt)})
app.post('/register',(req,res)=>{Register.RegisterHandle(req,res,bcrypt,knex,db)})
app.get('/profile/:id',(req,res)=>{Profile.ProfileHandle(req,res,knex,db)})
app.put('/image',(req,res)=>{Image.ImageHandle(req,res,db,knex)})
app.post('/imageurl',(req,res)=>{Image.Imageurl(req,res)})
	 		
app.listen(process.env.PORT || 3000, ()=>{
	console.log(`server is working at port ${PORT}`)
})
















