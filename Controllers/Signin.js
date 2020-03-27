


 const SigninHandle=(req,res,db,knex,bcrypt)=>{
	const {email,password}=req.body
	 
 	  if(!email||!password){
        return res.status(400).json('invalid form submission')
    }
	 db('login')
	 .select('email','hash')
	 .where({
	   email:email,
	 })
	 .then(data=>{
	 	const isvalid = bcrypt.compareSync(password, data[0].hash);
	 	if(isvalid){
	 		db('users')
	 		.select('*')
	 		.where({
	 			email:data[0].email
	 		}).then(user=>{
	 			res.json(user[0])
	 		}).catch(err=>res.json('unable to get user'))

	 	 }else{
	 	 	res.status(400).json('wrong credentials')
	 	 }
	 })
	 .catch(err=>res.status(400).json('unable to signin'))
	
}


module.exports = {
	SigninHandle:SigninHandle
}