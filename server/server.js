const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get('/api/host', (req, res) => {
  res.send({host: 'SCS'});
});

app.get('/api/test', (req, res) => {
  db.query("select * from test", (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});