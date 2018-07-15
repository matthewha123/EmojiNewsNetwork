const express = require('express')
const app = express()
const port = 3000

const requestHandler = (request, response) => {
	response.json({
		text: "sample"
	})
}

app.get('/', (request, response) => {
  throw new Error('oops')
})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

const errHandler = (err) => {
	if(err) {
		return console.log("wtf man", err)
	}
	console.log(`server listening on ${port}`)
}
app.listen(port, errHandler)