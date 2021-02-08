function init(){
    let container = document.getElementById('swiperContainer')
    container.appendChild(createWrapper(cardsCollection,createCard))
}
function createEl(el,cls){
    let element = document.createElement(el)
    element.className = cls
    return element
}
function createDiv(cls){
    let div = document.createElement('div')
    div.className = cls
    return div
}
function createImg(cls,url){
    let img = createEl('img',cls)
    img.src = url
    return img
}


function clearContainer(){
    let container = document.getElementById('swiperContainer')
    container.textContent = ""
}






