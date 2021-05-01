export function popper(message, time=2500) {
    let root = document.querySelector(".div-4");
    let popup = document.createElement("div");
    popup.setAttribute("class","popup");
    popup.textContent = message;
    root.insertBefore(popup, root.childNodes[0]);
    let trans = 0;

    setTimeout(() => popup.style.transform = `translateY(${trans}px)`, 200);

    setTimeout(() => {
        popup.style.transform = "translateY(-60px)";
        setTimeout(() => root.removeChild(popup), 500);
    }, time);
}