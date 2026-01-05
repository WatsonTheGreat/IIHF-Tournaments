document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       HAMBURGER MENU (ALL PAGES)
    ------------------------------ */
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("open");
        });
    }

    /* -----------------------------
       PLAYOFFS ONLY
    ------------------------------ */
    const playoffsContainer = document.getElementById("playoffs");

    if (playoffsContainer) {

        // ==========================
        // PLAYOFF DATA
        // ==========================
        const playoffGames = [
            /* ======================
               QUARTER-FINALS
            ====================== */
            {
                round: "Quarter-finals",
                date: "Jan 2",
                time: "14:00",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
            {
                round: "Quarter-finals",
                date: "Jan 2",
                time: "15:30",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
            {
                round: "Quarter-finals",
                date: "Jan 2",
                time: "17:00",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
            {
                round: "Quarter-finals",
                date: "Jan 2",
                time: "19:30",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
        
            /* ======================
               SEMI-FINALS
            ====================== */
            {
                round: "Semi-finals",
                date: "Jan 4",
                time: "16:00",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
            {
                round: "Semi-finals",
                date: "Jan 4",
                time: "19:30",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            },
        
            /* ======================
               RELEGATION GAME
            ====================== */
            {
                round: "Relegation Game",
                date: "Jan 3",
                time: "11:30",
                home: "–",
                away: "–",
                homeScore: null,
                awayScore: null
            }
        ];

        let currentRound = "";

        playoffGames.forEach(game => {

            if (game.round !== currentRound) {
                const title = document.createElement("h3");
                title.textContent = game.round;
                playoffsContainer.appendChild(title);
                currentRound = game.round;
            }

            const gameDiv = document.createElement("div");
            gameDiv.className = "game";

            const homeScore = game.homeScore ?? "–";
            const awayScore = game.awayScore ?? "–";

            gameDiv.innerHTML = `
                <div class="datetime">
                    <div>${game.date}</div>
                    <div>${game.time}</div>
                </div>

                <div class="teams">
                    <div>${game.home}</div>
                    <div>${game.away}</div>
                </div>

                <div class="score">
                    <div>${homeScore}</div>
                    <div>${awayScore}</div>
                </div>
            `;

            playoffsContainer.appendChild(gameDiv);
        });
    }
});