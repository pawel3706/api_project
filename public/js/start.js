class Start {
    constructor() {

        this.lastInputValue;
        this.initalImgNum = 32
        this.currentImgNum = this.initalImgNum;

        document.querySelector('nav .search').addEventListener('submit',
            this.searchNewCategory.bind(this));

        document.querySelector('.footer__button').addEventListener('click', this.showMoreImages.bind(this));

        window.addEventListener('resize', this.setGalleryHeight);

        this.img = new Img();
        this.init();
    }

    init() {

        const data = {
            endpoint: 'trending',
            inputValue: '',
            imgsNum: this.initalImgNum,
            startFrom: 0
        }

        fetch('/img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            return this.img.appendImagesToHTML(json.data);
        })
        .catch(err => console.log('Błąd', err));

    }

    searchNewCategory(e) {
        e.preventDefault();
        const input = document.querySelector('.search__input');

        if (input.value === '') {
            return
        }

        const data = {
            endpoint: 'search',
            inputValue: input.value,
            imgsNum: this.initalImgNum,
            startFrom: 0
        }

        fetch('/img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            document.querySelector('.gallery').textContent = '';
            return this.img.appendImagesToHTML(json.data);
        })
        .catch(err => console.log('Błąd', err));

        this.lastInputValue = input.value;
        input.value = '';
    }

    showMoreImages() {

        const newImgsNum = 24;

        const data = {
            endpoint: this.lastInputValue ? 'search' : 'trending',
            inputValue: this.lastInputValue || '',
            imgsNum: newImgsNum,
            startFrom: this.currentImgNum
        }

        fetch('/img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            return this.img.appendImagesToHTML(json.data);
        })
        .catch(err => console.log('Błąd', err));

        this.currentImgNum += newImgsNum;

    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Start;
})