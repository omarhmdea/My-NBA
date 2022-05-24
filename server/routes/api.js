const express = require('express')
const urllib = require("urllib");
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = []

router.get('/teams/:teamName', function (request, response) {
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json/', function (err, data, res) {
        const data_parsed = JSON.parse(data)
        const players = processData(data_parsed.league.standard, request.params.teamName)
        response.send(players);
    })
})

function processData(players, teamName) {
    let team = []
    for (const i in players) {
        if (players[i].isActive && teamToIDs[teamName] === players[i].teamId) {
            const imgUrl = getPlayerImg(players[i])
            players[i].imgUrl = imgUrl
            team.push(players[i])

        }
    }
    return team
}

function getPlayerImg(player) {
    let playerLastName = player.lastName.split(" ")
    if (playerLastName.length > 1) {
        let newLastName = playerLastName[0] + '_' + playerLastName[1]
        player.lastName = newLastName.slice(0, newLastName.length - 1)
    }
    return `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`
}

router.put('/team', function (req, res) {
    const requestObj = req.body
    teamToIDs[requestObj.teamName] = requestObj.teamId
    res.send(teamToIDs)
})

router.get('/dreamTeam', function(req, res){
    console.log(dreamTeam);
    res.send(dreamTeam)
})

router.post('/addPlayer', function(req, res){
    let player = req.body
    console.log(player);
    dreamTeam.push(player)
    res.end()
})
module.exports = router
