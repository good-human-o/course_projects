import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/contact', (req, res) => {
  res.send('<h3>Contact me at 9999999999</h3>');
});

app.get('/about', (req, res) => {
  res.send('<h2>I am Anshul!</h2>');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});