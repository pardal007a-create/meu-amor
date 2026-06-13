const cover = document.querySelector(".front-cover");
const sheets = document.querySelectorAll(".sheet");

let currentSheet = -1;
let startX = 0;
let endX = 0;

/* =====================
   ABRIR CAPA
===================== */

function openCover() {

    if (!cover.classList.contains("opened")) {

        cover.classList.add("opened");

        cover.style.transform =
            "rotateY(-180deg)";

        cover.style.zIndex = "1";

        return true;
    }

    return false;
}

/* =====================
   FECHAR CAPA
===================== */

function closeCover() {

    cover.classList.remove("opened");

    cover.style.transform =
        "rotateY(0deg)";

    cover.style.zIndex = "100";

}

/* =====================
   PRÓXIMA FOLHA
===================== */

function nextPage() {

    if (!cover.classList.contains("opened")) {

        openCover();
        return;
    }

    if (currentSheet < sheets.length - 1) {

        currentSheet++;

        sheets[currentSheet]
            .classList.add("flipped");
    }
}

/* =====================
   FOLHA ANTERIOR
===================== */

function previousPage() {

    if (currentSheet >= 0) {

        sheets[currentSheet]
            .classList.remove("flipped");

        currentSheet--;

        return;
    }

    if (cover.classList.contains("opened")) {

        closeCover();
    }
}

/* =====================
   SWIPE MOBILE
===================== */

document.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;

});

document.addEventListener("touchend", e => {

    endX = e.changedTouches[0].clientX;

    const distance = startX - endX;

    if (distance > 70) {
        nextPage();
    }

    if (distance < -70) {
        previousPage();
    }

});

/* =====================
   MOUSE
===================== */

let dragging = false;

document.addEventListener("mousedown", e => {

    dragging = true;
    startX = e.clientX;

});

document.addEventListener("mouseup", e => {

    if (!dragging) return;

    dragging = false;

    endX = e.clientX;

    const distance = startX - endX;

    if (distance > 70) {
        nextPage();
    }

    if (distance < -70) {
        previousPage();
    }

});

/* =====================
   TECLADO
===================== */

document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {
        nextPage();
    }

    if (e.key === "ArrowLeft") {
        previousPage();
    }

});

/* =====================
   Z-INDEX AUTOMÁTICO
===================== */

sheets.forEach((sheet, index) => {

    sheet.style.zIndex =
        sheets.length - index;

});