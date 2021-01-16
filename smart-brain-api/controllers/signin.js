const handleSignin = (req, res, knex, bcrypt) => {
	const { email, password } = req.body;
	knex.select('email','hash').from('login')
		.where('email', '=', email)
		.then(data => {
			bcrypt.compare(password, data[0].hash, (err, response) => {
				if(response) {
					return knex.select('*').from('users')
						.where('email', '=', email)
						.then(user => {
							res.json(user[0])
						})
						.catch(err => res.status(400).json('unable to get user'))
				} else {
					return res.status(400).json('wrong credentials')
				}
			})
		})
		.catch(err => res.status(400).json('wrong credentials'))

/*	bcrypt.compare("bacon", hash, function(err, resp) {
    	// resp == true
	});
	bcrypt.compare("veggies", hash, function(err, resp) {
	    // resp = false
	});
	let found = false
	database.users.forEach(user => {
		if (user.email === email && user.password === password) {
			found = true
			return res.json(user)
		}
	})
	if (!found) {
		res.status(400).json('not found')
	}*/

};

module.exports = {
	handleSignin: handleSignin
};