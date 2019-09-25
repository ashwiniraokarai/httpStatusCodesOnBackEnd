//webprojects/http-response-codes/index.js
/*A simple API skeleton in Node.js using Express Framework
Express is a minimal and flexible Node.js web application framework that 
provides a robust set of features to develop web and mobile applications.
Allows to set up middlewares to respond to HTTP Requests.

Defines a routing table which is used to perform different actions based on HTTP Method and URL.

Allows to dynamically render HTML Pages based on passing arguments to templates.
*/

//import express framework (Prerequisite: express needs to be installed first)
const express = require('express');
//import body-parser - a node.js MIDDLEWARE for parsing incoming data : JSON, Raw, Text and URL encoded form data. (Prerequisite: bodyParser npackage eeds to be installed first)
const bodyParser = require('body-parser');

//create the web app (a new instance of express)
const app = express();

//MIDDLEWARE to handle url-encoded data is returned by bodyParser.urlencoded(). { extended: false } is a configuration option that tells the user to use CLASSIC ENCODING which means values
//can only be STRINGS or ARRAYS
app.use(bodyParser.urlencoded({ extended: false }));


//That should import the dependencies we need for the project. Next, define some ROUTES. These routes simply return an html file (page) or a message when you hit them.
//NOTE: THE SERVER NEEDS TO BE STARTED. THAT'S DONE AT THE END AFTER ROUTES ARE DEFINED


//DEFINE ROUTES. Routes are DIVIDED into FOUR PARTS for ease: SUCCESS STATUS CODES (2xx), REDIRECTION STATUS CODES (3xx), CLIENT ERROR STATUS CODES (4xx), SERVER ERROR STATUS CODES (5xx)
//NOTE: Don't worry about the html files referenced here. You'll create them at your project's root directory as part of your front-end set up

/*----------------------SUCCESS STATUS CODES----------------------------------------------------*/

//200 OK

app.get('/',(req, res) => {
	res.status(200).sendFile(`${__dirname}/html/register.html`) 
});


app.get('/update',(req,res) => {
	res.status(200).sendFile(`${__dirname}/html/update.html`) 
});

app.get('/bad-request',(req,res) => {
	res.status(200).sendFile(`${__dirname}/html/bad-request.html`)
});

app.get('/complete',(req,res) => {
	res.status(200).sendFile(`${__dirname}/html/complete.html`) 
});

app.get('/old-registration',(req,res) => {
	res.status(200).sendFile(`${__dirname}/html/old-register.html`)
});

app.get('/old-reg-fail',(req,res) => {
	res.status(200).sendFile(`${__dirname}/html/old-reg-fail.html`)
});

app.get('/user/john-new.html',(req,res) => {  //This is like an API end point that returns data!
	res.status(200).send({message : "This is John's new page"})
});

app.get('/user/jane-new',(req,res) => {  //This is like an API end point that returns data!
	res.status(200).send({message : "This is Jane's new page"})
});

app.get('/thank-you-page',(req,res) => {  //This is like an API end point that returns data!
	res.status(200).send({message : "Thank you for registering"})
});


//201 CREATED (SUCCESSFUL CREATION OF RECORDS)

app.post('/register',(req,res) => {
	//logic to save to database should go here
	res.status(201).send({message : 'registration complete'})
});

app.post('/login',(req,res) => {
	//logic to login should go here
	res.status(201).send({message : 'You are logged in'})
});


//204 NO CONTENT (SUCCESSFUL UPDATES TO RECORDS)
//(updating a resource, without changing the current content of the page displayed to the user. In other words -
//The server has successfully fulfilled the request and there is no additional content to send in the response payload body.)
app.put('/update',(req,res) => {
	//logic to update the database record should go here. 
	//Since you do not have database hooked up, you'll need to simulate the update experience by creating an update form with prefilled dummy data as part of your front end [code]
	res.status(204).end()
});
/*----------------------END SUCCESS STATUS CODES----------------------------------------------------*/


/*----------------------REDIRECTION STATUS CODES----------------------------------------------------*/
//301 MOVED PERMANENTLY
app.get('/user/john', (req,res) => {
	res.set('location','/user/john-new.html')
	res.status(301).send();
});
//This redirection might fail because browsre may change the request method to GET
app.post('/old-registration-fail', (req,res) => {
	res.set('location','/register')
	res.status(301).send();
});

//302 FOUND
app.get('/user/jane', (req,res) => {
	res.set('location','/user/jane-new')
	res.status(302).send();
});

//303 SEE OTHER
app.post('/complete-registration', (req,res) => {
	res.set('location','/thank-you-page')
	res.status(303).send();
});

//307 TEMPORAL REDIRECT
app.post('/old-registration', (req,res) => {
	res.set('location','/register')
	res.status(307).send();
});

//308 PERMANENT REDIRECT
app.post('/old-login', (req,res) => {
	res.set('location','/login')
	res.status(308).send();
});
/*----------------------END REDIRECTION STATUS CODES----------------------------------------------------*/


/*----------------------CLIENT ERROR STATUS CODES----------------------------------------------------*/
//400 BAD REQUEST
app.post('/bad-request', (req,res) => {
	res.status(400).send({message : "You are missing vital credentials"})
});

//401 UNAUTHORIZED
app.get('/user', (req,res) => {
	res.status(401).send({message : "You need to login to view this"})
});

//403 FORBIDDEN
app.get('/super-secret', (req,res) => {
	res.status(403).send({message : "You are forbidden from seeing this"})
});

//405 METHOD NOT ALLOWED
app.all('/only-put', (req,res) => {
	if (req.method == "PUT") {
		res.status(204).end()
	}
	else {
		res.status(405).send({message : "Please use put"})
	}
});
/*----------------------END CLIENT ERROR STATUS CODES----------------------------------------------------*/

/*----------------------SERVER ERROR STATUS CODES----------------------------------------------------*/
//500 INTERNAL SERVER ERROR
app.post('/500', (req,res) => {
	res.status(500).send({message : "I failed. I'm sorry"})
});

//501 UNAUTHORIZED
app.patch('*', (req, res) => {
	res.status(501).send({message : "I will patch no such thing"})
});

//503 SERVICE UNAVAILABLE
app.get('/503', (req,res) => {
	res.status(503).send({message: "I had to take a break. Getting too old for this"})
});

//505 METHOD NOT ALLOWED{}
app.all('/http2', (req,res) => {
	if(req.httpVersion == "2.0") {
		res.status(200).send({message: "You get a response. She gets a response...Everybody gets a response"})
	} else {
		res.status(505).send({message:"Only http2 baby"})
	}
});
/*----------------------END SERVER ERROR STATUS CODES----------------------------------------------------*/



/*AT LAST, CATCH EVERYTHING ELSE NOT DEFINED.*/
//404 NOT FOUND 
app.all('*', (req, res) => {
       res.status(404).send({message : "This resource was not found"})
})


/*START YOUR SERVER (listen to incoming requests so you can serve them)*/
app.listen(3000,() => {
	console.info("Node based web application running on port 3000")
});







