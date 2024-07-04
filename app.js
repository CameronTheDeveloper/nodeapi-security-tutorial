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

app.listen(4000, () => console.log('Server started on port 4000'));