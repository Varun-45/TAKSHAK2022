import express from "express";
import {DB_URL, PORT} from "./config.js";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from "mongoose";
import QuerySchema from "./mongoose.js";

mongoose.Promise = global.Promise

const _fs = fs.promises

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    mongoose.connect(`${DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
catch {
    console.log("Not able to connect to the database")
}

const createUserQuery = async (name, email, query) => {
    const user = await QuerySchema.findById(email)
    if(user) {
        return user
    }
    else {
        const new_user = new QuerySchema({ 
            _id: email, 
            name: name, 
            queries: query 
        })
        await new_user.save()
        return { 
            _id: email, 
            name: name, 
            queries: query 
        }
    }
}

const updateUserQuery = async (name, email, query) => {
    const user = await QuerySchema.findById(email)
    if(!user) {
        return createUserQuery(name, email, query)
    }
    return (await user.set("queries", user.queries+"<::>"+query).save())
}

const loadQueries = async () => {
    const queries = await QuerySchema.find()
    return queries
}

const CRICKET = 
`DRESS CODE - Sports Shoes + Shorts/Tracks
Matches will be played of 8 overs and finals of 12 overs.
Umpire Decision will be final
Bowling Rules:
  - For 8 overs match, all bowlers can bowl maximum of 2 overs, power play = 2 overs.
  - For 12 overs match, two bowlers can bowl maximum of 3 overs, rest 2 overs, power play = 4 overs. 
There will be run on wide and no ball (free hit will be given)
Only Full arm bowling is allowed.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
No substitution other than mentioned will be allowed.
In case team fails to gather 11 members the other team will be given bye.`

const TUG_OF_WAR = 
`Each match time will be 5 minutes.
At the end of 15 minutes which ever team scores the highest points advances to the next round.
The weights that are to be added can be approximate and the exact weights will be measured before the event. 
If it turns out that the team weight is more than the limit. Then the teams will be disqualified.
DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
In case team fails to gather 8 members the other team will be given bye.
The total team weight is 560kg with an average player to be 70kg.`

const BADMINTON_MALE =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
In case team fails to gather 2 members the other team will be given bye.
All matches except finals will be played in a 3 set match of 11 points each.
Finals will be played in a 3 set match of 21 points each.`

const BADMINTON_FEMALE =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
In case team fails to gather 2 members the other team will be given bye.
All matches except finals will be played in a 3 set match of 11 points each.
Finals will be played in a 3 set match of 21 points each.`

const THROWBALL = 
`This sport is organized only for girls.
Each match comprises of 1 set with 21 points each.
All matches will be played in sets of 3
DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
In case team fails to gather 6 members the other team will be given bye.`

const ATHLETICS_100M =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
If registered players are not present at the location during the race then he/she will be disqualified.`

const ATHLETICS_4_100M =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
No substitution is allowed for this event.
If all the participants are not present at the venue the team will be disqualified.`

const CHESS =
`Each match excluding finals will be of 5 [+3] blitz format.
Finals will be of 3 [+2] bullet format with a set of 3 matches.
If a participant is not present at the match location at the assigned time then he/she will be disqualified.
Match Referee Decision will be final.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.`

const BASKETBALL =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
No substitution other than mentioned will be allowed.
In case team fails to gather 5 members the other team will be given bye.`

const VOLLEYBALL = 
`In case team fails to gather 6 members the other team will be given bye.
Each match comprises of 3 set with 21 points each.
Finals will be played of 3 set with 21 points each
DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.Each
Details of matches will be updated on website.`

const FOOTBALL =
`DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Only team captain must fill the form.
Team name must be parliamentary and non-vulgar.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.
No substitution other than mentioned will be allowed.
In case team fails to gather 8 members the other team will be given bye.
There will be two half of 15 minutes each.
In case of tie we will continue with 5 free-kicks.`

const TT = 
`Each match comprises of 3 set with 11 points each.
Finals will be played of 3 set with 21 points each
DRESS CODE - Sports Shoes + Shorts/Tracks. 
Match Referee Decision will be final.
Join the WhatsApp group to know updates about schedule and fixtures.
Details of matches will be updated on website.`

const RULES = {
   "Cricket": CRICKET,
   "Chess": CHESS,
   "Tug of War - Male": TUG_OF_WAR,
   "Tug of War - Female": TUG_OF_WAR,
   "Badminton - Male": BADMINTON_MALE,
   "Badminton - Female": BADMINTON_FEMALE,
   "Throw Ball": THROWBALL,
   "Table Tennis": TT,
   "Football": FOOTBALL,
   "Volleyball": VOLLEYBALL,
   "Basketball": BASKETBALL,
   "Athletics 100m Race": ATHLETICS_100M,
   "Athletics 4x100m Relay Race": ATHLETICS_4_100M
}

const ATHLETICS_100M_TABLE = 
`<p>Fixtures</p>
<hr>
<table class="table table-dark table-striped" style="text-align: center;">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Group A</th>
            <th scope="col">Group B</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>HarshVardhan Gupta</td>
            <td>TEJESWAR</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Varun Ravi Malpani</td>
            <td>Dhavala Sandeep Kumar</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>G JITHENDRA KUMAR</td>
            <td>Pavan kumar</td>
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>Gaurav Anand</td>
            <td>Srawan Meesala</td>
        </tr>
        <tr>
            <th scope="row">5</th>
            <td>PARTH BHANDARI</td>
            <td>Pranav Gupta</td>
        </tr>
    </tbody>
</table>
<hr>
<p>Finals</p>
<hr>
<table class="table table-dark table-striped" style="text-align: center;">
    <thead>
        <tr>
            <th scope="col">Members</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1st from Group A</th>
        </tr>
        <tr>
            <th scope="row">2nd from Group A</th>
        </tr>
        <tr>
            <th scope="row">1st from Group B</th>
        </tr>
        <tr>
            <th scope="row">2nd from Group B</th>
        </tr>
    </tbody>
</table>`

const ATHLETICS_4_100M_TABLE = 
`<p>Fixtures</p>
<hr>
<table class="table table-dark table-striped" style="text-align: center;">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Group A</th>
            <th scope="col">Group B</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Team Fab 4</td>
            <td>Team Supersonics</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Team Flash</td>
            <td>Team Velocity</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Team BBG</td>
            <td>Team Jaguar</td>
        </tr>
    </tbody>
</table>
<hr>
<p>Finals</p>
<hr>
<table class="table table-dark table-striped" style="text-align: center;">
    <thead>
        <tr>
            <th scope="col">Members</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1st from Group A</th>
        </tr>
        <tr>
            <th scope="row">2nd from Group A</th>
        </tr>
        <tr>
            <th scope="row">1st from Group B</th>
        </tr>
        <tr>
            <th scope="row">2nd from Group B</th>
        </tr>
    </tbody>
</table>`


app.use(express.static(__dirname+"/static"))

app.get("/", (_, res) => {
   res.sendFile(path.join(__dirname, "static", "index.html"))
})

app.get("/organizer", (_, res) => {
   res.sendFile(path.join(__dirname, "static", "organizer.html"))
})

app.get("/sport", async (req, res) => {
    var sport_name = req.query.name
    const filter = req.query.filter
    if(filter) {
        sport_name += "-" + filter
    }
    const sports = [
       "cricket", 
       "chess",
       "tug-of-war-m",
       "tug-of-war-f",
       "badminton-m",
       "badminton-f",
       "throw-ball",
       "table-tennis",
       "football", 
       "volleyball",
       "basketball",
       "100m",
       "4x100m",
    ]
    const IDS = [
       "Cricket",
       "Chess",
       "ToW-Male",
       "ToW-Female",
       "Badminton-M",
       "Badminton-F",
       "Throw Ball",
       "Table Tennis",
       "Football",
       "Volleyball",
       "Basketball",
       "100m Race",
       "4x100m Relay",
    ]
    const links = [
        "https://challonge.com/CricketTakshak2022",
        "https://challonge.com/ChessTakshak2022",
        "https://challonge.com/TugOfWarTakshak2022M",
        "https://challonge.com/TugOfWarTakshak2022F",
        "https://challonge.com/BadmintonTakshak2022M",
        "https://challonge.com/BadmintonTakshak2022F",
        "https://challonge.com/ThrowballTakshak2022",
        "https://challonge.com/TableTennisTakshak2022",
        "https://challonge.com/FootballTakshak2022",
        "https://challonge.com/VolleyballTakshak2022",
        "https://challonge.com/BasketballTakshak2022",
        "/", "/"
    ]
    if(!sports.includes(sport_name)) {
        res.sendFile(path.join(__dirname, "static", "404", "index.html"))
        return
    }
    else {
        var file = "index.html"
        if(["100m", "4x100m"].includes(sport_name)) {
            file = "sports.html"
        }
        var data = await _fs.readFile(path.join(__dirname, "static", "sports", file))
        .then(data => data.toString())
        .catch(err => {
           res.sendFile(path.join(__dirname, "static", "404", "index.html"))
           console.log(err)
           return
        })
        const index = sports.indexOf(sport_name)
        const name = IDS[index]
        const rules = "\t\t\t\n"+Object.values(RULES)[index].split("\n").map(e => `<li>${e}</li>`).join("\t\t\t\n")
        data = data.replaceAll("{{SPORT_NAME}}", name)
        data = data.replaceAll("{{RULES}}", rules).replaceAll("{{LINK}}", links[index])
        if(index === sports.length-1) {
            data = data.replaceAll("{{TABLE}}", ATHLETICS_4_100M_TABLE)
        }
        if(index === sports.length-2) {
            data = data.replaceAll("{{TABLE}}", ATHLETICS_100M_TABLE)
        }
        await _fs.writeFile(path.join(__dirname, "static", "sports", "temp.html"), data.trim())
        .then(_res => {
           res.sendFile(path.join(__dirname, "static", "sports", "temp.html"))
           return
        })
        .catch(err => {
           res.sendFile(path.join(__dirname, "static", "404", "index.html"))
           console.log(err)
           return
        })
    }
})

app.get('/coming-soon', (req, res) => {
    res.sendFile(path.join(__dirname, "static", "coming-soon", "index.html"))
})

app.get("/query", async (req, res) => {
    res.sendFile(path.join(__dirname, "static", "query", "index.html"))
})

app.get("/submit-query", async (req, res) => {
    var query = req.query.query
    var name = req.query.name
    var email = req.query.email
    console.log(name)
    if(name && email && query) {
        console.log(query)
        await updateUserQuery(name, email, query)
    }
})

const TEMPLATE = 
`<hr class="my-0" />

<div class="card-body p-4">
    <div class="d-flex flex-start">
        <img class="rounded-circle shadow-1-strong me-3"
            src="../IIITS_Mascot.png" alt="avatar"
            width="60" height="60" />
        <div>
            <h6 class="fw-bold mb-1">{{NAME}} ({{EMAIL}})</h6>
            <div class="d-flex align-items-center mb-3">
                <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                <a href="#!" class="text-success"><i class="fas fa-redo-alt ms-2"></i></a>
                <a href="#!" class="link-danger"><i class="fas fa-heart ms-2"></i></a>
            </div>
            <p class="mb-0">
                {{QUERY}}
            </p>
        </div>
    </div>
</div>`

app.get("/organizer-portal", async (req, res) => {
    const queries = await loadQueries()
    var to_be_updated = []
    for(var query of queries) {
        var name = query.name
        var mail = query._id
        to_be_updated.push(...query.queries.split("<::>").map(q => {
            return TEMPLATE
            .replaceAll("{{NAME}}", name)
            .replaceAll("{{EMAIL}}", mail)
            .replaceAll("{{QUERY}}", q)
        }))
    }
    var data = await _fs.readFile(path.join(__dirname, "static", "portal", "index.html"))
    .then(data => data.toString())
    .catch(err => {
        res.sendFile(path.join(__dirname, "static", "404", "index.html"))
        console.log(err)
        return
    })
    await _fs.writeFile(path.join(__dirname, "static", "portal", "temp.html"), data.replaceAll("{{QUERIES}}", to_be_updated.join("\n\n")))
    res.sendFile(path.join(__dirname, "static", "portal", "temp.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "about", "index.html"))
})

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "static", "404", "index.html"))
})

app.listen(PORT, () => {
   console.log(`Using port:`, PORT)
})
