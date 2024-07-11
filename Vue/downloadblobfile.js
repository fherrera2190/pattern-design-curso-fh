// Supongamos que ya tienes el enlace blob.
let blobUrl = "{link}"

fetch(blobUrl)
  .then(response => response.blob())
  .then(blob => {
    let url = URL.createObjectURL(blob);

    console.log('URL para descargar el archivo:', url);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.pdf'; 

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  })
  .catch(error => console.error('Error al descargar el archivo:', error));