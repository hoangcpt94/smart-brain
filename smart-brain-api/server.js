const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const knex = require('knex')({
	client: 'pg',
	connection: {
  		connectionString: process.env.DATABASE_URL,
  		ssl: {
  			rejectUnauthorized: false
  		}
  	}
})

/*const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'tongtulenh',
    database : 'smart_brain'
  }
});
*/
const app = express();

app.use(express.json());
app.use(cors())

//
/*const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})*/


app.get('/', (req, res) => {
	res.send("It is working!");
})

//
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })

//
app.post('/register', (req,res) => { register.handleRegister(req, res, knex, bcrypt) })

//
/*app.get('/profile/:id', (req, res) => {
	const { id } = 	req.params;
	knex.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('error getting user')
			}
		})*/
		
/*	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found')
	}*/
// })

//
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


/*//
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

//
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})



/*# Planning our API
/ ---> res = this is working
/signin ---> POST = success/fail (We're not creating a new user, why are we doing a POST?)
									Remember: any time we're sending a password, we don't
									really want to send it as a query string. We want to 
									send it inside of the body ideally oer HTTPs
/register ---> POST = user
/profile/:userId ---> GET = user
/image ---> PUT = user*/