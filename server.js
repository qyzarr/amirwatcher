const express = require('express')
const fetch = require('node-fetch')
const app = express()

// reverse proxy for vidsrc
app.get('/embed/:type/:imdb', async (req, res) => {
  const { type, imdb } = req.params
  const url = `https://vidsrc-embed.ru/embed/${type}/${imdb}`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': req.get('User-Agent') } // helps bypass simple blocks
    })
    const html = await response.text()
    res.send(html)
  } catch (err) {
    console.error(err)
    res.status(500).send('Proxy error')
  }
})

// serve static files like index.html
app.use(express.static('public'))

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'))
