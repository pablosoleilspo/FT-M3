const express = require('express');
const app = express();
const sumArray = require('./tests/sumArray');

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hola',
  });
});

// '/test'
app.get('/test', (req, res)=> {
  res.status(200).send({
    message: 'test'
  })
})

app.post('/product', (req, res) => {
  const { a, b } = req.body;
  res.status(200).send({
    result: a * b
  });
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body
  res.status(200).send({
    result: a + b
  })
})

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;

  const result = sumArray(array, num)
  res.status(200).send({
    result
  })
})

app.post('/numString', (req, res) => {
  const { str } = req.body

  if(!str || typeof str === 'number') return res.sendStatus(400)
  else {
    const result = str.length

    return res.status(200).send({result})
  }
})

app.post('/pluck', (req, res) => {
  const { array, name } = req.body;

  if(!Array.isArray(array) || !name) return res.sendStatus(400)

  else {
    const result = array.map(obj => obj.name)
    return res.status(200).send({result})
  }
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
