const colorPicker = document.getElementById("color");
const backgroundColor = document.getElementById("background");
const canvas = document.getElementById("myCanvas");
const fontSize = document.getElementById("fontsize");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const retrieveBtn = document.getElementById("retrieveBtn");
const ctx = canvas.getContext("2d");

 colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
 })

 canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
 })

 canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
 })

 canvas.addEventListener('mouseleave', () => {
    isDrawing=false;
 })

 canvas.addEventListener('mouseup', () => {
   isDrawing=false;
})

 backgroundColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
 })

 fontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
 })

 clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
 })

 saveBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    
    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();

    link.click();
 })


 retrieveBtn.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();

        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
 })