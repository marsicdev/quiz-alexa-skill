const data = [
    { PlayerName: "Cristiano Ronaldo", Position: "Forward", Club: "Real Madrid", NationalTeam: "Portugal", Age: 32, YearOfBirth: 1985, SquadNumber: 7 },
    { PlayerName: "James Rodriguez", Position: "Midfielder", Club: "Bayern Munich", NationalTeam: "Columbia", Age: 26, YearOfBirth: 1991, SquadNumber: 11 },
    { PlayerName: "Gareth Bale", Position: "Winger", Club: "Real Madrid", NationalTeam: "Wales", Age: 28, YearOfBirth: 1989, SquadNumber: 11 },
    { PlayerName: "Karim Benzema", Position: "Forward", Club: "Real Madrid", NationalTeam: "France", Age: 30, YearOfBirth: 1987, SquadNumber: 9 },
    { PlayerName: "Sergio Ramos", Position: "Defender", Club: "Real Madrid", NationalTeam: "Spain", Age: 29, YearOfBirth: 1988, SquadNumber: 4 },
    { PlayerName: "Iker Casillas", Position: "Goalkeeper", Club: "Porto", NationalTeam: "Spain", Age: 29, YearOfBirth: 1988, SquadNumber: 1 },
    { PlayerName: "Neymar", Position: "Forward", Club: "Paris Saint Germain", NationalTeam: "Brazil", Age: 25, YearOfBirth: 1992, SquadNumber: 2 },
    { PlayerName: "Andres Iniesta", Position: "Midfielder", Club: "Barcelona", NationalTeam: "Spain", Age: 33, YearOfBirth: 1986, SquadNumber: 8 },
    { PlayerName: "Lionel Messi", Position: "Forward", Club: "Barcelona", NationalTeam: "Argentina", Age: 30, YearOfBirth: 1987, SquadNumber: 3 },
    { PlayerName: "Luis Suarez", Position: "Forward", Club: "Barcelona", NationalTeam: "Uruguay", Age: 30, YearOfBirth: 1987, SquadNumber: 9 },
    { PlayerName: "Gerard Pique", Position: "Defender", Club: "Barcelona", NationalTeam: "Spain", Age: 30, YearOfBirth: 1987, SquadNumber: 3 },
    { PlayerName: "Mesut Özil", Position: "Midfielder", Club: "Arsenal", NationalTeam: "Germany", Age: 29, YearOfBirth: 1988, SquadNumber: 11 },
    { PlayerName: "David Luiz", Position: "Midfielder", Club: "Paris Saint-Germain", NationalTeam: "Brazil", Age: 30, YearOfBirth: 1987, SquadNumber: 30 },
    { PlayerName: "Zlatan Ibrahimovic", Position: "Forward", Club: "Paris Saint-Germain", NationalTeam: "Sweden", Age: 36, YearOfBirth: 1981, SquadNumber: 10 },
    { PlayerName: "Wayne Rooney", Position: "Forward", Club: "Everton", NationalTeam: "England", Age: 32, YearOfBirth: 1985, SquadNumber: 10 }
]

// This is a list of positive speechcons that this skill will use when a user gets a correct answer.
const speechConsCorrect = ["All righty", "Bam", "Bingo", "Boom", "Bravo", "Cheers", "Dynomite",
    "Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Oh snap", "Phew",
    "Well done", "Whee", "Woo hoo", "Yay"];

// This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.
const speechConsWrong = ["Argh", "Aw man", "Bummer", "D'oh", "Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks",
    "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];


module.exports = {
    data,
    speechConsCorrect,
    speechConsWrong
}
