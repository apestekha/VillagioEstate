

function createImageSlide(image){
    let div = createEl('div','swiper-slide') 
    let img = createImg('swiper-image',image) 
    div.appendChild(img)
    return div
}

function createImageContainer(images){
    let imageContainer = createEl('div','swiper-container swiper-container-image') 
    imageContainer.appendChild(createWrapper(images,createImageSlide))
    imageContainer.appendChild(createEl('div','swiper-pagination'))
    return imageContainer
}
function createPriceTitle(price){
    let priceContainer =  createEl('div','card-price-container')
    let priceTitle = createEl('h4','card-price')
    priceTitle.innerHTML = price +' р.'
    priceContainer.appendChild(priceTitle)
    return priceContainer
}
function createTitle(name){
    let title = createEl('p','card-name')
    title.innerHTML = name
    return title
}
function createOptions(card){
    let options = createEl('p','card-options')
    options.innerHTML = card.houseArea + ' м2 |'+ card.landArea +' соток |'+card.roomsCount+' комнат |'+card.village
    return options
}
function createFooter(author){
    let footer = createEl('div','card-footer')
    let authorContainer = createEl('div','card-footer-author-container')
    let authorAvatar = createEl('div','card-footer-author-avatar')
    let authorTitle = createEl('div','card-footer-author')
    authorTitle.innerHTML = author
    authorContainer.appendChild(authorAvatar)
    authorContainer.appendChild(authorTitle)
    let del = createEl('div',"card-delete")
    let fav = createEl('div',"card-favourite")
    del.addEventListener('click',handleDelete)
    footer.appendChild(authorContainer)
    footer.appendChild(del)
    footer.appendChild(fav)

    return footer
}
function createCard(card){
    let div = createEl('div','swiper-slide card')
    div.id = card.id
    div.appendChild(createImageContainer(card.images))
    div.appendChild(createPriceTitle(card.price))
    div.appendChild(createTitle(card.name))
    div.appendChild(createOptions(card))
    div.appendChild(createFooter(card.author))
    return div
}
function createWrapper(collect, fnCreate){
    let wrapper = createEl('div','swiper-wrapper')
    collect.forEach(card => {
        wrapper.appendChild(fnCreate(card))
    })
    return wrapper
}

function handleDelete(){
    cardsCollection.splice(swiperCard.clickedIndex,1)
    swiperCard.removeSlide(swiperCard.clickedIndex)
    swiperCard.update ()
}
function handleAdd(){
    let card = {...cardsCollection[0],
        id:cardsCollection.length,
        price: cardsCollection[0].price.trim()+swiperCard.slides.length
    }
    cardsCollection.push(card)
    swiperCard.appendSlide(createCard(card))
    swiperCard.update ()
}
function handleEdit(){
    let button = document.getElementById('editButton')
    button.innerHTML = 'Завершить'
    button.addEventListener('click',handleSumit)
    button.removeEventListener('click',handleEdit)
    let priceContainerCollection = document.getElementsByClassName('card-price')
    Array.from(priceContainerCollection).forEach(el => {
        let price = el.innerHTML
        let priceInput = createEl('input','card-price-input')
        priceInput.value = price
        el.replaceWith(priceInput)
    })
}
function handleSumit(){
    let button = document.getElementById('editButton')
    button.innerHTML = 'Редактировать'
    button.addEventListener('click',handleEdit)
    button.removeEventListener('click',handleSumit)
    let priceContainerCollection = document.getElementsByClassName('card-price-input')
    Array.from(priceContainerCollection).forEach(el => {
        updateCollection(el.parentNode.parentNode.id,el.value)
        let price = el.value
        let priceTitle = createEl('h4','card-price')
        priceTitle.innerHTML = price
        el.replaceWith(priceTitle)
    })

}
function updateCollection(id,value){
    const index = cardsCollection.findIndex(card=>card.id==id)
    cardsCollection[index].price = value.substring(0 ,value.length-2)
}

init()




