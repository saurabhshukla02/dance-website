const express = require("express");
const path = require('path');
const fs = require('fs');







// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected..");
});

//MAKING A NEW SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    mobile: Number,
    location: String,
    address: String,
  });

//COMPILING THE SCHEMA & MAKING MODEL
const contact = mongoose.model('contactDetail', contactSchema);











const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF:
app.use('/static', express.static('static')); //For serving the static files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF:
app.set('view engine', 'pug'); //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    const cont = "This is tutorial 75. we are making a dance website."
    const params = {
        'title': 'Dance Academy',
        'content': cont,
    };
    res.status(200).render('index.pug', params);
})

app.get('/home', (req, res)=>{
    const cont = "This is tutorial 75. we are making a dance website."
    const params = {
        'title': 'Dance Academy | Home',
        'content': cont,
    };
    res.status(200).render('home.pug', params);
})

app.get('/about', (req, res)=>{
    const cont = "This is tutorial 75. we are making a dance website."
    const params = {
        'title': 'Dance Academy | About',
        'content': cont,
    };
    res.status(200).render('about.pug', params);
})

app.get('/Contact', (req, res)=>{
    const cont = "This is tutorial 75. we are making a dance website."
    const params = {
        'title': 'Dance Academy | Contact Us',
        'content': cont,
    };
    res.status(200).render('contactUs.pug', params);
})

app.get('/Services', (req, res)=>{
    const cont = "This is tutorial 75. we are making a dance website."
    const params = {
        'title': 'Dance Academy | Services',
        'content': cont,
    };
    res.status(200).render('services.pug', params);
})




// POST REQUEST:
// app.post('/contact', (req, res)=>{

//     client = req.body.name;
//     age = req.body.age;
//     gender = req.body.gender;
//     email = req.body.email;
//     cellPhoneNumber = req.body.mobile;
//     location = req.body.location;
//     address = req.body.address;

//     let outputToWrite = `A client, ${client}, ${age} year old ${gender}, who currently lives at ${address}, has choosen for location ${location}. His/Her contacts are Email: ${email} and cell phone number: ${cellPhoneNumber}.`
    
//     fs.writeFileSync('output.txt', outputToWrite);

//     console.log(req.body);

//     const cont = "Your form has been submitted successfully!"
//     const params = {
//         'title': 'Dance Academy | Services',
//         'message': cont,
//     };
//     res.status(200).render('formsubmission.pug', params);
// })




app.post('/contact', (req, res)=>{


    // MAKING A NEW OBJECT TO COLLECT ALL THE CONTACT DETAILS:-
    const contactDetails = new contact(req.body);

    // SAVING THE OBJECTS THAT WE MADE:-
    contactDetails.save(function (err, contactDetails) {
        if (err) return console.error(err);
        console.log("Details has been saved to the database.");
      });
    
    

    console.log(req.body);

    const cont = "Your form has been submitted successfully!"
    const params = {
        'title': 'Dance Academy | Services',
        'message': cont,
    };
    res.status(200).render('formsubmission.pug', params);
})







// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sucessfully at port: ${port}`);
})