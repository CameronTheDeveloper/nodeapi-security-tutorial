const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Format Of Token:
// Authorization: Bearer <access_token>

// Verify Token

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    req.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData: authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'john',
        email: 'john@gmail.com'
    };

    jwt.sign({ user: user }, { expiresIn: '1h' }, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});

app.listen(4000, () => console.log('Server started on port 4000'));