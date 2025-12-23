function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu.style.right === "0px") {
        menu.style.right = "-200px";
    } else {
        menu.style.right = "0px";
    }
}
