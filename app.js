const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', (req, res) => {
    res.json({
        message: 'Post created...'
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'john',
        email: 'john@gmail.com'
    };

    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});

app.listen(4000, () => console.log('Server started on port 4000'));