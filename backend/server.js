const express = require('express')
const cors = require('cors')
const crypto = require("crypto-random-string");
const axios = require('axios')
const app = express()
const fs = require("fs");

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.locals.userTokens = JSON.parse(fs.readFileSync("./data/users.json"))
  next()
})


app.post('/usercheck', (req, res, next) => {
  const userTokens = res.locals.userTokens
  if (req.body.secureToken !== null) {
    const userObj = userTokens.find(tokenObj => tokenObj.token === req.body.secureToken)
    res.json({name: userObj.userName, regAt: userObj.genDate})
  } else {
    res.sendStatus(200)
  }
})


app.post('/subscribe', (req, res, next) => {
  const userTokens = res.locals.userTokens
  const subDate = Date.now()

  const newToken = crypto(25)
  userTokens.push({token: newToken, genDate: subDate, userName: req.body.username})
  fs.writeFileSync("./data/users.json", JSON.stringify(userTokens, null, 2));
  res.json({token: newToken, name: req.body.username, regAt: subDate})
})


app.post('/news', async (req, res) => {
  const pageNum = req.body.pageNumber
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&country=hu&page=${pageNum}&apiKey=3566b5d328154eb3bba6317081006368`)
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'error', error})
    }
})

app.post('/unsubscribe', (req, res) => {
  //console.log(req.body.token);

  const userTokens = res.locals.userTokens
  const userTokensFiltered = userTokens.filter(tokenObj => tokenObj.token !== req.body.token)
  fs.writeFileSync("./data/users.json", JSON.stringify(userTokensFiltered, null, 2));
  res.json({msg:'Successfully unsubscribed :('}); 
});

app.listen(5000)

//2729d0e8d05e48909e33c9c2f0dd0bf1
//3566b5d328154eb3bba6317081006368