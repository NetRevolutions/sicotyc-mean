const express = require('express');
//const router = express.Router();
const router = express();

// declare axios for making http request
const axios = require('axios');
const API = "https://jsonplaceholder.typicode.com";


/* GET api listing */
router.get('/', (req, res)=>{
    res.send('api works');
});

// Get All post
router.get('/posts', (req, res)=>{
    // Get post from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
    axios.get(`${API}/posts`)
        .then(posts => {
            res.status(200).json(posts.data);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;