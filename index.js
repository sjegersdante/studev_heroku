const express = require('express');
const app = express();
const ejs = require('ejs');
const fetch = require('node-fetch');

app.set('view engine', 'ejs');
app.use(express.static("public"));
//app.use(express.static(__dirname + '/public'));
// app.set('port', 3000);

//let clubs:any = {};
//const doFetch = async() => {
//    let response = await fetch('https://futdb.app/api/clubs?page=1', 
//    { 
//        headers: { 
//            "X-AUTH-TOKEN": "903dd7e7-c399-4b54-8385-351efe065d63",
//        },
//        accept: "application/json",        
//    });
//    clubs = await response.json();
//};
//doFetch();

//Fetches Club Names
let clubs = {};
const doFetch = async() => {
    let response = await fetch('https://futdb.app/api/clubs?page=1', 
    { 
        headers: { 
            "X-AUTH-TOKEN": "903dd7e7-c399-4b54-8385-351efe065d63",
        },
        accept: "application/json",        
    });
    clubs = await response.json();
};
doFetch();

//Fetches League Names
let leagues = {};
const getLeagues = async() => {
    let leagueRes = await fetch('https://futdb.app/api/leagues?page=1', 
    { 
        headers: {
            "X-AUTH-TOKEN": "903dd7e7-c399-4b54-8385-351efe065d63",
        },
        accept: "application/json",        
    });
    leagues = await leagueRes.json();
};
getLeagues();

//Fetches Club Logo
let clubImage = {};
const getImage = async() => {
    try {
        const promise = await fetch('https://futdb.app/api/clubs/1/image', {
            method: "GET" ,
            headers: {
                "Content-type": "image/png",
                "X-AUTH-TOKEN": "761c5200-f3af-4fa3-93db-2180200159de"
            },
        });
        const response = await promise.arrayBuffer();
        clubImage = new Buffer(response).toString('base64');
        return clubImage
    } catch (err) {
        console.log(err)
    }
};
getImage();

//Fetches League Logo
let leagueImage = {};
const getleagueImage = async() => {
    try {
        const promise = await fetch('https://futdb.app/api/leagues/13/image', {
            method: "GET" ,
            headers: {
                "Content-type": "image/png",
                "X-AUTH-TOKEN": "761c5200-f3af-4fa3-93db-2180200159de"
            },
        });
        const response = await promise.arrayBuffer();
        leagueImage = new Buffer(response).toString('base64');
        return leagueImage
    } catch (err) {
        console.log(err)
    }
};
getleagueImage();


app.get('/',(req, res)=>{
    res.render("index")
});

app.get('/fifagame-active-part2',(req,res)=>{
    res.render("fifagame-active-part2", {leagueImage: leagueImage, clubs: clubs});
});

app.get('/fifagame-active',(req,res)=>{
    res.render("fifagame-active", {clubImage: clubImage, leagues: leagues});
});

app.get('/fifagame',(req,res)=>{
    res.render("fifagame", {clubs: clubs});
});

app.get('/games',(req,res)=>{
    res.render("games", {clubs: clubs});
});

app.get('/scorebord',(req,res)=>{
    res.render("scorebord", {clubs: clubs});
});

app.listen(process.env.PORT || 5000)
// app.listen(app.get('port'),
// ()=>console.log( '[server] http://localhost:' + app.get('port')));