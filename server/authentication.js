module.exports = {
	authIDToken: authIDToken,
}
const CLIENT_ID = '890276463877-a739gmqetq14ct2gfb8ifp0g5hsbtql4.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function authIDToken(req,res,next) {
	let t = req.body['token'];
	console.log("TOKEN RECEIVED: ", t);
	let payload;
	try {
		payload = await verify(t);

		res.status(200)
			.json({
				message:'ID TOKEN AUTH SUCCESS',
				data: payload
			})
	} catch(error) {
		console.log("WOOPS");
		console.log(error);
		res.status(200)
			.json({
				message:"Id token authentication failed",
				status:"authentiaction failed"
			})
	}
}	

async function verify(token) {
	const ticket = await client.verifyIdToken({idToken: token, audience: CLIENT_ID});
	const payload = ticket.getPayload();
	console.log("AUTH PAYLOAD: ", payload);
	return payload;
}

