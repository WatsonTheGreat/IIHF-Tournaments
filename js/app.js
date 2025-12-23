// Hamburger menu toggle
function toggleMenu() {
    document.getElementById("menu").classList.toggle("open");
}

// -------------------------
// Group A & B Data
// -------------------------
const teamsA = [
  { name: "United States", seed: 1, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Sweden", seed: 4, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Slovakia", seed: 6, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Switzerland", seed: 8, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Germany", seed: 10, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
];

const gamesA = [
  { date: "Dec 26", time: "12:00", home: "Sweden", away: "Slovakia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 26", time: "17:00", home: "Germany", away: "United States", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 27", time: "14:00", home: "Germany", away: "Slovakia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 27", time: "17:00", home: "Switzerland", away: "United States", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 28", time: "14:00", home: "Switzerland", away: "Sweden", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 29", time: "12:00", home: "Germany", away: "Sweden", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 29", time: "17:00", home: "Slovakia", away: "United States", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 30", time: "14:00", home: "Switzerland", away: "Germany", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 31", time: "12:00", home: "Slovakia", away: "Switzerland", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 31", time: "17:00", home: "Sweden", away: "United States", homeGoals: null, awayGoals: null, OT_SO: false },
];

const teamsB = [
  { name: "Finland", seed: 2, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Czechia", seed: 3, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Canada", seed: 5, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Latvia", seed: 7, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Denmark", seed: 9, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
];

const gamesB = [
  { date: "Dec 26", time: "14:30", home: "Denmark", away: "Finland", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 26", time: "19:30", home: "Czechia", away: "Canada", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 27", time: "15:30", home: "Latvia", away: "Canada", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 27", time: "19:30", home: "Denmark", away: "Czechia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 28", time: "15:30", home: "Finland", away: "Latvia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 29", time: "15:30", home: "Finland", away: "Czechia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 29", time: "19:30", home: "Canada", away: "Denmark", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 30", time: "15:30", home: "Latvia", away: "Denmark", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 31", time: "15:30", home: "Czechia", away: "Latvia", homeGoals: null, awayGoals: null, OT_SO: false },
  { date: "Dec 31", time: "19:30", home: "Canada", away: "Finland", homeGoals: null, awayGoals: null, OT_SO: false },
];

// -------------------------
// Update Standings
// -------------------------
function updateStandings(teams, tableId) {
    teams.forEach(t => { t.GP=t.W=t.OTW=t.OTL=t.L=t.PTS=t.GF=t.GA=t.DIFF=0; });
    const gamesArray = tableId==="standingsA"?gamesA:gamesB;
    gamesArray.forEach(game => {
        if(game.homeGoals===null || game.awayGoals===null) return;
        const home=teams.find(t=>t.name===game.home);
        const away=teams.find(t=>t.name===game.away);
        home.GP++; away.GP++;
        home.GF+=game.homeGoals; home.GA+=game.awayGoals;
        away.GF+=game.awayGoals; away.GA+=game.homeGoals;
        home.DIFF=home.GF-home.GA; away.DIFF=away.GF-away.GA;
        if(game.homeGoals>game.awayGoals){
            if(game.OT_SO){ home.OTW++; away.OTL++; home.PTS+=2; away.PTS+=1; }
            else { home.W++; away.L++; home.PTS+=3; }
        } else if(game.awayGoals>game.homeGoals){
            if(game.OT_SO){ away.OTW++; home.OTL++; away.PTS+=2; home.PTS+=1; }
            else { away.W++; home.L++; away.PTS+=3; }
        }
    });
    teams.sort((a,b)=>b.PTS-a.PTS || b.DIFF-a.DIFF || b.GF-a.GF || a.seed-b.seed);
    const table=document.querySelector(`#${tableId} tbody`);
    table.innerHTML="";
    teams.forEach(team=>{
        const row=document.createElement("tr");
        row.innerHTML=`
            <td><img src="images/flags/${team.name.replace(" ","")}.png" alt="${team.name}" class="flag"></td>
            <td>${team.name}</td>
            <td>${team.GP}</td>
            <td>${team.W}</td>
            <td>${team.OTW}</td>
            <td>${team.OTL}</td>
            <td>${team.L}</td>
            <td>${team.PTS}</td>
            <td>${team.GF}</td>
            <td>${team.GA}</td>
            <td>${team.DIFF}</td>
            <td>${team.seed}</td>
        `;
        table.appendChild(row);
    });
}

// -------------------------
// Admin Panel
// -------------------------
function openAdmin() {
    const code = prompt("Enter admin code:");
    if(code!=="66666"){ alert("Wrong code!"); return; }
    const group=prompt("Which group? (A or B)").toUpperCase();
    const gamesArray=group==="A"?gamesA:gamesB;
    const teamsArray=group==="A"?teamsA:teamsB;
    let gameStr=gamesArray.map((g,i)=>`${i+1}: ${g.home} vs ${g.away} - ${g.homeGoals??'-'}:${g.awayGoals??'-'}`).join("\n");
    const gameIndex=parseInt(prompt(`Select game to edit:\n${gameStr}`),10)-1;
    if(gameIndex<0 || gameIndex>=gamesArray.length){ alert("Invalid game"); return; }
    const homeGoals=parseInt(prompt(`Enter goals for ${gamesArray[gameIndex].home}:`),10);
    const awayGoals=parseInt(prompt(`Enter goals for ${gamesArray[gameIndex].away}:`),10);
    gamesArray[gameIndex].homeGoals=homeGoals;
    gamesArray[gameIndex].awayGoals=awayGoals;
    updateStandings(teamsArray, group==="A"?"standingsA":"standingsB");
    alert("Score updated!");
}

// -------------------------
// Initialize
// -------------------------
document.addEventListener("DOMContentLoaded",()=>{
    if(document.querySelector("#standingsA")) updateStandings(teamsA,"standingsA");
    if(document.querySelector("#standingsB")) updateStandings(teamsB,"standingsB");
    const adminBtn=document.getElementById("admin-btn");
    if(adminBtn) adminBtn.addEventListener("click", openAdmin);
});
