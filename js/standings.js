document.addEventListener("DOMContentLoaded", () => {
    const teams = {};

    // Initialize teams
    document.querySelectorAll("tr[data-team]").forEach(row => {
        const name = row.dataset.team;
        teams[name] = {
            row,
            gp: 0,
            w: 0,
            otw: 0,
            otl: 0,
            l: 0,
            pts: 0,
            gf: 0,
            ga: 0
        };
    });

    // Process games
    document.querySelectorAll("tbody tr.game").forEach(game => {
        const scoreCell = game.querySelector(".score");
        if (!scoreCell) return;

        let scoreText = scoreCell.textContent.replace("–", "-").trim();

        // Skip unfinished games
        if (scoreText === "-" || scoreText === "") return;

        const [hg, ag] = scoreText.split("-").map(Number);
        if (isNaN(hg) || isNaN(ag)) return; // skip invalid scores

        const home = game.querySelector("[data-home]").dataset.home;
        const away = game.querySelector("[data-away]").dataset.away;

        const otCell = game.children[5]; // 6th column = OT/SO
        const isOT = otCell && otCell.textContent.trim() !== "";

        const homeTeam = teams[home];
        const awayTeam = teams[away];
        if (!homeTeam || !awayTeam) return;

        // GP
        homeTeam.gp++;
        awayTeam.gp++;

        // Goals
        homeTeam.gf += hg;
        homeTeam.ga += ag;
        awayTeam.gf += ag;
        awayTeam.ga += hg;

        // Results
        if (hg > ag) {
            if (isOT) {
                homeTeam.otw++;
                homeTeam.pts += 2;
                awayTeam.otl++;
                awayTeam.pts += 1;
            } else {
                homeTeam.w++;
                homeTeam.pts += 3;
                awayTeam.l++;
            }
        } else if (ag > hg) {
            if (isOT) {
                awayTeam.otw++;
                awayTeam.pts += 2;
                homeTeam.otl++;
                homeTeam.pts += 1;
            } else {
                awayTeam.w++;
                awayTeam.pts += 3;
                homeTeam.l++;
            }
        }
    });

    // Update standings table
    Object.values(teams).forEach(t => {
        t.row.querySelector(".gp").textContent = t.gp;
        t.row.querySelector(".w").textContent = t.w;
        t.row.querySelector(".otw").textContent = t.otw;
        t.row.querySelector(".otl").textContent = t.otl;
        t.row.querySelector(".l").textContent = t.l;
        t.row.querySelector(".pts").textContent = t.pts;
        t.row.querySelector(".gf").textContent = t.gf;
        t.row.querySelector(".ga").textContent = t.ga;
        t.row.querySelector(".diff").textContent = t.gf - t.ga;
    });
});
