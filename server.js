const express = require('express')
const fetch = require('node-fetch')
const app = express()
const PORT = 3000

// serve your frontend html
app.use(express.static('public')) // put your html in public/

// reverse proxy endpoint
app.get('/embed/:type/:imdb', async (req, res) => {
  const { type, imdb } = req.params
  // vidsrc embed URL
  const url = `https://vidsrc.tv/embed/${type}/${imdb}`

  try {
    const response = await fetch(url)
    const text = await response.text()
    // optional: rewrite links/scripts if needed
    res.setHeader('Content-Type', 'text/html')
    res.send(text)
  } catch(err) {
    console.error(err)
    res.status(500).send('error fetching vidsrc')
  }
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
