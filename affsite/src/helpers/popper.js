export function popper(message) {
    let root = document.querySelector(".div-4");
    let popup = document.createElement("div");
    popup.setAttribute("class","popup");
    popup.textContent = message;
    root.insertBefore(popup, root.childNodes[0]);
    let trans = 12;

    setTimeout(() => popup.style.transform = `translateY(${trans}px)`, 500);

    setTimeout(() => {
        popup.style.transform = "translateY(-60px)";
        setTimeout(() => root.removeChild(popup), 500);
    }, 2800);
}