function openMenu() {
    const ul = document.querySelector("nav ul.ul");
    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");

    ul.style.display = "flex";
    ul.classList.add("active");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
}

function closeMenu() {
    const ul = document.querySelector("nav ul.ul");
    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");

    ul.style.display = "none";
    ul.classList.remove("active");
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
}

document.querySelectorAll(".dropdown").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        let submenu = item.nextElementSibling;

        if (submenu && submenu.classList.contains("dropdown-menu")) {
            submenu.classList.toggle("open");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const spots = document.querySelectorAll(".spot");

    spots.forEach((spot, index) => {
        spot.style.opacity = "0";
        spot.style.transform = "translateY(40px)";

        setTimeout(() => {
            spot.style.transition = "all 0.8s ease";
            spot.style.opacity = "1";
            spot.style.transform = "translateY(0)";
        }, index * 300);
    });
});
