const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data if needed
app.use(express.json());

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the POST request from the form
app.post('/add-numbers', (req, res) => {
    // Access the numbers from the request body
    const num1 = parseFloat(req.body.number1);
    const num2 = parseFloat(req.body.number2);

    
    if (isNaN(num1) || isNaN(num2)) {
        return res.send('Please enter valid numbers.');
    }

    // Calculate the sum
    const sum = num1 + num2;

    // Send the result back to the user
    res.send(`
        <h1>The sum of ${num1} and ${num2} is ${sum}</h1>
        <a href="/">Go Back</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
