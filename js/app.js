function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("open");
}
// -------------------------
// 1️⃣ Teams array
// -------------------------
const teams = [
  { name: "United States", seed: 1, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Sweden", seed: 4, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Slovakia", seed: 6, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Switzerland", seed: 8, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
  { name: "Germany", seed: 10, GP: 0, W: 0, OTW: 0, OTL: 0, L: 0, PTS: 0, GF: 0, GA: 0, DIFF: 0 },
];

// -------------------------
// 2️⃣ Games array
// -------------------------
const games = [
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

// -------------------------
// 3️⃣ Update Standings
// -------------------------
function updateStandings() {
  // Reset all stats
  teams.forEach(team => {
    team.GP = 0;
    team.W = 0;
    team.OTW = 0;
    team.OTL = 0;
    team.L = 0;
    team.PTS = 0;
    team.GF = 0;
    team.GA = 0;
    team.DIFF = 0;
  });

  // Loop through all games
  games.forEach(game => {
    // Skip games without scores
    if (game.homeGoals === null || game.awayGoals === null) return;

    // Find team objects
    const homeTeam = teams.find(t => t.name === game.home);
    const awayTeam = teams.find(t => t.name === game.away);

    // Update GP
    homeTeam.GP++;
    awayTeam.GP++;

    // Update GF and GA
    homeTeam.GF += game.homeGoals;
    homeTeam.GA += game.awayGoals;
    awayTeam.GF += game.awayGoals;
    awayTeam.GA += game.homeGoals;

    // Update DIFF
    homeTeam.DIFF = homeTeam.GF - homeTeam.GA;
    awayTeam.DIFF = awayTeam.GF - awayTeam.GA;

    // Determine result
    if (game.homeGoals > game.awayGoals) {
      if (game.OT_SO) {
        homeTeam.OTW++;
        awayTeam.OTL++;
        homeTeam.PTS += 2;
        awayTeam.PTS += 1;
      } else {
        homeTeam.W++;
        awayTeam.L++;
        homeTeam.PTS += 3;
      }
    } else if (game.awayGoals > game.homeGoals) {
      if (game.OT_SO) {
        awayTeam.OTW++;
        homeTeam.OTL++;
        awayTeam.PTS += 2;
        homeTeam.PTS += 1;
      } else {
        awayTeam.W++;
        homeTeam.L++;
        awayTeam.PTS += 3;
      }
    }
    // Tie is not possible in this tournament
  });

  // Sort teams for standings: PTS → DIFF → GF → Seed
  teams.sort((a, b) => {
    if (b.PTS !== a.PTS) return b.PTS - a.PTS;
    if (b.DIFF !== a.DIFF) return b.DIFF - a.DIFF;
    if (b.GF !== a.GF) return b.GF - a.GF;
    return a.seed - b.seed;
  });

  // Update HTML table
  const table = document.querySelector(".standings tbody");
  table.innerHTML = ""; // clear current rows

  teams.forEach(team => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><img src="images/flags/${team.name.replace(" ", "")}.png" alt="${team.name}" class="flag"></td>
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
// 4️⃣ Initialize
// -------------------------
updateStandings();



