document.getElementById('btn_fuera').addEventListener('click', () => {
    console.log("Botonfuera")
})

const div= document.getElementById("divShadow")
const shadow = div.attachShadow({ mode: "open" });
shadow.innerHTML = `<div class="nemesis"></div>`
const button = document.createElement("button")
button.id="btnShadow"
button.textContent = "Click me"
shadow.appendChild(button)
shadow.querySelector(".nemesis").innerHTML = "Nemesis";
console.log(shadow)
console.log(shadow===div.shadowRoot)

if([]){
    console.log("true")
}