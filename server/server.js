const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/host', (req, res) => {
  res.send('scs');
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});