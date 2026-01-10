document.addEventListener("DOMContentLoaded", () => {

    const teams = {};

    // REGISTER TEAMS
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
            ga: 0,
            seed: Number(row.dataset.seed)
        };
    });

    // PROCESS GAMES
    document.querySelectorAll(".game").forEach(game => {
        const scoreCell = game.querySelector(".score");
        if (!scoreCell) return;

        const score = scoreCell.textContent.trim();
        if (score === "–" || score === "-") return;

        const [hg, ag] = score.split("-").map(Number);
        if (isNaN(hg) || isNaN(ag)) return;

        const home = game.querySelector("[data-home]").dataset.home;
        const away = game.querySelector("[data-away]").dataset.away;
        const isOT = game.querySelector(".ot")?.textContent.trim() !== "";

        const H = teams[home];
        const A = teams[away];

        H.gp++; A.gp++;

        H.gf += hg; H.ga += ag;
        A.gf += ag; A.ga += hg;

        if (hg > ag) {
            if (isOT) {
                H.otw++; H.pts += 2;
                A.otl++; A.pts += 1;
            } else {
                H.w++; H.pts += 3;
                A.l++;
            }
        } else {
            if (isOT) {
                A.otw++; A.pts += 2;
                H.otl++; H.pts += 1;
            } else {
                A.w++; A.pts += 3;
                H.l++;
            }
        }
    });

    // SORT STANDINGS
    const sorted = Object.values(teams).sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        const diffA = a.gf - a.ga;
        const diffB = b.gf - b.ga;
        if (diffB !== diffA) return diffB - diffA;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.seed - b.seed;
    });

    // UPDATE TABLE
    const tbody = document.querySelector(".standings tbody");

    sorted.forEach((t, i) => {
        tbody.appendChild(t.row);
        t.row.querySelector(".gp").textContent = t.gp;
        t.row.querySelector(".w").textContent = t.w;
        t.row.querySelector(".otw").textContent = t.otw;
        t.row.querySelector(".otl").textContent = t.otl;
        t.row.querySelector(".l").textContent = t.l;
        t.row.querySelector(".pts").textContent = t.pts;
        t.row.querySelector(".gf").textContent = t.gf;
        t.row.querySelector(".ga").textContent = t.ga;
        t.row.querySelector(".diff").textContent = t.gf - t.ga;
        t.row.querySelector(".seed").textContent = t.seed;
    });

    // MAKE STANDINGS ROWS CLICKABLE (TEAM ROSTERS)
    document.querySelectorAll("tr[data-team]").forEach(row => {
        row.style.cursor = "pointer";

        row.addEventListener("click", () => {
            const team = row.dataset.team;
            if (!team) return;

            // Go to teams folder (same level as group pages)
            window.location.href = `teams/${team}.html`;
        });
    });

});
