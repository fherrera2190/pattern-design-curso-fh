console.log("Hola")
const inputFile = document.querySelector("input")
const img = document.querySelector("img")

inputFile.addEventListener("change", (event) => {
    console.log(event.target.files)    
    img.src = URL.createObjectURL(event.target.files[0])
    console.log(img.src)
})


let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);