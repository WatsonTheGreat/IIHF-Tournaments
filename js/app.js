// Hamburger menu
document.getElementById("hamburger")?.addEventListener("click",()=>{
    document.getElementById("menu").classList.toggle("open");
});

// Load data from games.json
let gamesData = {};
fetch('data/games.json')
    .then(res=>res.json())
    .then(data=>{
        gamesData = data;
        renderStandingsAndGames();
    });

// Render tables
function renderStandingsAndGames(){
    if(document.querySelector("#standingsA")){
        renderStandings(gamesData.teamsA,"standingsA");
        renderGames(gamesData.gamesA,"gamesA");
    }
    if(document.querySelector("#standingsB")){
        renderStandings(gamesData.teamsB,"standingsB");
        renderGames(gamesData.gamesB,"gamesB");
    }
}

function renderGames(gamesArray, tableId){
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML="";
    gamesArray.forEach(g=>{
        const row = document.createElement("tr");
        row.innerHTML=`
            <td>${g.date}</td>
            <td>${g.time}</td>
            <td>${g.home}</td>
            <td>${g.homeGoals!==null && g.awayGoals!==null ? g.homeGoals+" - "+g.awayGoals : "-"}</td>
            <td>${g.away}</td>
            <td>${g.OT_SO??""}</td>
        `;
        tbody.appendChild(row);
    });
}

function renderStandings(teams, tableId){
    teams.sort((a,b)=>b.PTS-a.PTS || b.DIFF-a.DIFF || b.GF-a.GF || a.seed-b.seed);
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML="";
    teams.forEach(t=>{
        const row=document.createElement("tr");
        row.innerHTML=`
            <td><img src="images/flags/${t.name.replace(" ","")}.png" class="flag"></td>
            <td>${t.name}</td><td>${t.GP}</td><td>${t.W}</td><td>${t.OTW}</td><td>${t.OTL}</td>
            <td>${t.L}</td><td>${t.PTS}</td><td>${t.GF}</td><td>${t.GA}</td><td>${t.DIFF}</td><td>${t.seed}</td>
        `;
        tbody.appendChild(row);
    });
}

