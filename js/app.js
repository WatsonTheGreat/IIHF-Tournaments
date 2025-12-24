function toggleMenu(){
  document.getElementById("menu").classList.toggle("open");
}

// --- Data embedded directly ---
const data = {
  groupA:[
    { date:"Dec 26", time:"12:00", home:"Sweden", away:"Slovakia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 26", time:"17:00", home:"Germany", away:"United States", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 27", time:"14:00", home:"Germany", away:"Slovakia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 27", time:"17:00", home:"Switzerland", away:"United States", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 28", time:"14:00", home:"Switzerland", away:"Sweden", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 29", time:"12:00", home:"Germany", away:"Sweden", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 29", time:"17:00", home:"Slovakia", away:"United States", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 30", time:"14:00", home:"Switzerland", away:"Germany", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 31", time:"12:00", home:"Slovakia", away:"Switzerland", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 31", time:"17:00", home:"Sweden", away:"United States", homeGoals:null, awayGoals:null, OT_SO:"" }
  ],
  groupB:[
    { date:"Dec 26", time:"14:30", home:"Denmark", away:"Finland", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 26", time:"19:30", home:"Czechia", away:"Canada", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 27", time:"15:30", home:"Latvia", away:"Canada", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 27", time:"19:30", home:"Denmark", away:"Czechia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 28", time:"15:30", home:"Finland", away:"Latvia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 29", time:"15:30", home:"Finland", away:"Czechia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 29", time:"19:30", home:"Canada", away:"Denmark", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 30", time:"15:30", home:"Latvia", away:"Denmark", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 31", time:"15:30", home:"Czechia", away:"Latvia", homeGoals:null, awayGoals:null, OT_SO:"" },
    { date:"Dec 31", time:"19:30", home:"Canada", away:"Finland", homeGoals:null, awayGoals:null, OT_SO:"" }
  ]
};

const teamsA = [
  { name:"United States",seed:1 },
  { name:"Sweden",seed:4 },
  { name:"Slovakia",seed:6 },
  { name:"Switzerland",seed:8 },
  { name:"Germany",seed:10 }
];

const teamsB = [
  { name:"Finland",seed:2 },
  { name:"Czechia",seed:3 },
  { name:"Canada",seed:5 },
  { name:"Latvia",seed:7 },
  { name:"Denmark",seed:9 }
];

// Render games table
function renderGames(gamesArray, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return; // Table doesn't exist on this page
  const tbody = table.querySelector("tbody");
  tbody.innerHTML="";
  gamesArray.forEach(g=>{
    const row=document.createElement("tr");
    row.innerHTML=`
      <td>${g.date}</td>
      <td>${g.time}</td>
      <td>${g.home}</td>
      <td>${g.homeGoals!==null?g.homeGoals:"-"} - ${g.awayGoals!==null?g.awayGoals:"-"}</td>
      <td>${g.away}</td>
      <td>${g.OT_SO}</td>
    `;
    tbody.appendChild(row);
  });
}

// Update standings
function updateStandings(teams, gamesArray, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return; // Table doesn't exist on this page
  teams.forEach(t=>Object.assign(t,{GP:0,W:0,OTW:0,OTL:0,L:0,PTS:0,GF:0,GA:0,DIFF:0}));
  gamesArray.forEach(g=>{
    if(g.homeGoals===null||g.awayGoals===null) return;
    const home = teams.find(t=>t.name===g.home);
    const away = teams.find(t=>t.name===g.away);
    home.GP++; away.GP++;
    home.GF += g.homeGoals; home.GA += g.awayGoals;
    away.GF += g.awayGoals; away.GA += g.homeGoals;
    home.DIFF = home.GF - home.GA; away.DIFF = away.GF - away.GA;
    if(g.homeGoals>g.awayGoals){
      if(g.OT_SO){ home.OTW++; away.OTL++; home.PTS+=2; away.PTS+=1; }
      else { home.W++; away.L++; home.PTS+=3; }
    } else if(g.awayGoals>g.homeGoals){
      if(g.OT_SO){ away.OTW++; home.OTL++; away.PTS+=2; home.PTS+=1; }
      else { away.W++; home.L++; away.PTS+=3; }
    }
  });
  teams.sort((a,b)=>b.PTS-a.PTS||b.DIFF-a.DIFF||b.GF-a.GF||a.seed-b.seed);
  const tbody = table.querySelector("tbody");
  tbody.innerHTML="";
  teams.forEach(t=>{
    const row=document.createElement("tr");
    row.innerHTML=`
      <td><img src="images/flags/${t.name.replace(" ","")}.png" class="flag"></td>
      <td>${t.name}</td>
      <td>${t.GP}</td>
      <td>${t.W}</td>
      <td>${t.OTW}</td>
      <td>${t.OTL}</td>
      <td>${t.L}</td>
      <td>${t.PTS}</td>
      <td>${t.GF}</td>
      <td>${t.GA}</td>
      <td>${t.DIFF}</td>
      <td>${t.seed}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  renderGames(data.groupA,"gamesA");
  updateStandings(teamsA,data.groupA,"standingsA");

  renderGames(data.groupB,"gamesB");
  updateStandings(teamsB,data.groupB,"standingsB");
});
Games(data.groupB,"gamesB");
  updateStandings(teamsB,data.groupB,"standingsB");
});

