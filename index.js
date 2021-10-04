const childProcess = require('child_process')
const express = require('express')
const app = express()

function getUrlInText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.match(urlRegex)
}

app.get("/url", (req, res) => {
  const url = getUrlInText(req.query.text)
  
  // TODO: probably very vulnerable! no bueno. but is ok :)
  const command = `youtube-dl --dump-json ${url.split(" ").join("%20")}`
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      res.sendStatus(404)
    } else {
      try {
        const json = JSON.parse(stdout)
        const formats = json.formats.filter(format => format.ext === "mp4")
        const bestFormat = formats.sort((a, b) => b.filesize - a.filesize)[0]
        const url = bestFormat.url
        res.send(url)
      } catch(e) {
        console.error(e)
        res.sendStatus(500)
      }
    }
  })
})

app.listen(process.env.PORT || 3000)