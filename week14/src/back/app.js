const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const staticPath = path.join(__dirname,'../../public')
console.log('serving static from', staticPath)

const heights = [
  { name: 'Bruno',   h: 178 },
  { name: 'John',    h: 164 },
  { name: 'Maria',   h: 150 },
  { name: 'Miranda', h: 168 },
  { name: 'Silvio',  h: 180 },
  { name: 'Binh',    h: 155 },
  { name: 'Annte',   h: 188 },
];

app.use(
    express.static(staticPath))

app.get('/data', (req, res) => {
  res.json(heights)  
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })