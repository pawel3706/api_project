class Start {
    constructor() {

        this.img = new Img();
        this.input = document.querySelector('.search__input');
        this.lastInputValue;
        this.endpoint = 'trending';
        this.imgsNumOnScreen = 32;
        this.init();
    }

    init() {
        this.img.getImages(this.endpoint);
        
        document.querySelector('nav .search').addEventListener('submit', 
        this.searchNewCategory.bind(this));
        
        document.querySelector('.footer__button').addEventListener('click', this.showMoreImages.bind(this));

        window.addEventListener('resize', this.setGalleryHeight);
    }

    searchNewCategory(e) {
        e.preventDefault();
        this.endpoint = 'search';
        document.querySelector('.gallery').textContent = '';
        this.img.getImages(this.endpoint, this.input.value);
        this.lastInputValue = this.input.value;
        this.input.value = '';
    }

    showMoreImages() {
        const newImgsNum = 24;
        this.img.getImages(this.endpoint, this.lastInputValue, newImgsNum, this.imgsNumOnScreen);
        this.imgsNumOnScreen += newImgsNum;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Start;
})


    

