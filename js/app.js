// Hamburger menu toggle
function toggleMenu() {
    document.getElementById("menu").classList.toggle("open");
}

// -------------------------
// Group Data
// -------------------------
const teamsA = [ /* same as your previous teamsA */ ];
const gamesA = [ /* same as your previous gamesA */ ];
const teamsB = [ /* same as your previous teamsB */ ];
const gamesB = [ /* same as your previous gamesB */ ];

// -------------------------
// Render Standings
// -------------------------
function updateStandings(teams, tableId) {
    teams.forEach(t => { t.GP=t.W=t.OTW=t.OTL=t.L=t.PTS=t.GF=t.GA=t.DIFF=0; });
    const gamesArray = tableId==="standingsA"?gamesA:gamesB;
    gamesArray.forEach(game => {
        if(game.homeGoals===null || game.awayGoals===null) return;
        const home=teams.find(t=>t.name===game.home);
        const away=teams.find(t=>t.name===game.away);
        home.GP++; away.GP++;
        home.GF+=game.homeGoals; home.GA+=game.awayGoals; home.DIFF=home.GF-home.GA;
        away.GF+=game.awayGoals; away.GA+=game.homeGoals; away.DIFF=away.GF-away.GA;
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
    const gamesArray = group==="A"?gamesA:gamesB;
    const teamsArray = group==="A"?teamsA:teamsB;
    let gameStr = gamesArray.map((g,i)=>`${i+1}: ${g.home} vs ${g.away} - ${g.homeGoals??'-'}:${g.awayGoals??'-'}`).join("\n");
    const gameIndex = parseInt(prompt(`Select game to edit:\n${gameStr}`),10)-1;
    if(gameIndex<0 || gameIndex>=gamesArray.length){ alert("Invalid game"); return; }
    const homeGoals = parseInt(prompt(`Enter goals for ${gamesArray[gameIndex].home}:`),10);
    const awayGoals = parseInt(prompt(`Enter goals for ${gamesArray[gameIndex].away}:`),10);
    gamesArray[gameIndex].homeGoals = homeGoals;
    gamesArray[gameIndex].awayGoals = awayGoals;
    updateStandings(teamsArray, group==="A"?"standingsA":"standingsB");
    alert("Score updated!");
}

// -------------------------
// Initialize
// -------------------------
document.addEventListener("DOMContentLoaded", ()=>{
    if(document.querySelector("#standingsA")) updateStandings(teamsA,"standingsA");
    if(document.querySelector("#standingsB")) updateStandings(teamsB,"standingsB");
    const adminBtn=document.getElementById("admin-btn");
    if(adminBtn) adminBtn.addEventListener("click", openAdmin);
});
