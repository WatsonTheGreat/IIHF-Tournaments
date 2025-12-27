document.addEventListener("DOMContentLoaded", () => {
    const teams = {};

    document.querySelectorAll("tr[data-team]").forEach(row => {
        const name = row.dataset.team;
        teams[name] = {
            row,
            gp: 0, w: 0, l: 0,
            pts: 0, gf: 0, ga: 0
        };
    });

    document.querySelectorAll(".game").forEach(game => {
        const scoreCell = game.querySelector(".score");
        if (!scoreCell || !scoreCell.textContent.includes("-")) return;

        const [hg, ag] = scoreCell.textContent.split("-").map(Number);
        const home = game.querySelector("[data-home]").dataset.home;
        const away = game.querySelector("[data-away]").dataset.away;

        teams[home].gp++;
        teams[away].gp++;

        teams[home].gf += hg;
        teams[home].ga += ag;
        teams[away].gf += ag;
        teams[away].ga += hg;

        if (hg > ag) {
            teams[home].w++;
            teams[home].pts += 3;
            teams[away].l++;
        } else {
            teams[away].w++;
            teams[away].pts += 3;
            teams[home].l++;
        }
    });

    Object.values(teams).forEach(t => {
        t.row.querySelector(".gp").textContent = t.gp;
        t.row.querySelector(".w").textContent = t.w;
        t.row.querySelector(".l").textContent = t.l;
        t.row.querySelector(".pts").textContent = t.pts;
        t.row.querySelector(".gf").textContent = t.gf;
        t.row.querySelector(".ga").textContent = t.ga;
        t.row.querySelector(".diff").textContent = t.gf - t.ga;
    });
});
