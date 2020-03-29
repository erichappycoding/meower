const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
require('dotenv').config();     //load variable from .env file

//Create an express application
const app = express();

const db = monk(process.env.meower_db_connection, { useNewUrlParser: true });    //'localhost/meower'  connect to local mongodb server and meower database. Db will automatically be created if not existed.
db.then(() => {
    console.log('Connected to Atlas MongoDB / meower database!');
});

const mews = db.get('mews');    //collection 'mews', will be automatically created if not exist

const filter = new Filter();
const itemsPerPage = 5;

app.use(cors());
app.use(express.json());    //to parse json object sent from client e.g. request.body in the post request

//Start listening for client requests
app.listen(5000, ()=> {
    console.log('Listening on http://localhost:5000');
});

// START - EXPRESS-RATE LIMIT //
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 10 // limit each IP to 100 requests per windowMs
});
   
//  apply to all requests
app.use(limiter);
// END - EXPRESS-RATE LIMIT //

app.get('/', (request, response) => {
    response.json({
        message : 'Meower! :)'
    });
});

//return 5 latest mews to the client, order by 'created' descending
app.get('/mews', (req, res) =>{

    mews
    .find({}, {limit: itemsPerPage, sort: {created: -1}}, function (error, result) {
        if(error) {
            console.log('Error occured when at when filtering mews.');
            res.status(500);
            res.json({message: 'Error occured when at when filtering mews.'});
        }
        else
            res.json(result);
    });
});

app.post('/mews', (req, res) => {
    if(isValidMew(req.body)){
        //store mew into database
        const mew = {
            //using filter to remove bad-words if any
            name: filter.clean(req.body['name'].toString()),
            content: filter.clean(req.body['content'].toString()),
            created: new Date()
        };

        mews
            .insert(mew)    //insert mew into mews db
            .then(createdMew => {   
                res.json(createdMew);   //return created mew object to client
            });
    } 
    else {
        res.status(422);
        res.json({
            message: 'Hey! Please enter valid name and message.'
        });
    }
});

//there're several libraries like yup, joi providing validation methods for objects esp. when objects contain many fields
function isValidMew(mew){
    return mew.name && mew.toString().trim() !== '' 
        && mew.content && mew.content.toString().trim() !== '';
}

