const clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: 'a6f7b001e1134cc7bf32f548d20f02ca'
});

const Imageurl = (req,res)=>{
	const {input}=req.body
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", input)
	.then(data=>{
		res.json(data)
	})
	.catch(console.log)
	
}


const ImageHandle=(req,res,db,knex)=>{
	const {id} = req.body;
	db('users')
	.where({id})
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>res.status(400).json('Unable to get entries'))

}


module.exports = {
    ImageHandle:ImageHandle,
    Imageurl:Imageurl
}