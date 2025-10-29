const express = require('express')
const fetch = require('node-fetch')
const path = require('path')
const app = express()

// reverse proxy for vidsrc
app.get('/embed/:type/:imdb', async (req, res) => {
  const { type, imdb } = req.params
  const url = `https://vidsrc-embed.ru/embed/${type}/${imdb}`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': req.get('User-Agent') }
    })
    const html = await response.text()
    res.send(html)
  } catch (err) {
    console.error(err)
    res.status(500).send('Proxy error')
  }
})

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('Server running at http://localhost:3000'))
