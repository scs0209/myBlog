import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Welcome to SCS's blog")
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});