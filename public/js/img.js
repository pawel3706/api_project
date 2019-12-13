class Img {
    constructor() {
        this.grid = new Grid();
    }

    appendImagesToHTML(imgs) {

        if (!document.querySelector('.gallery__break-line')) {
            this.grid.createBreakLines();
        }

        imgs.forEach(img => {
            const imgUrl = img.images.fixed_width.webp;
            const imgHeight = img.images.fixed_width.height;
            const imgWidth = img.images.fixed_width.width;

            const aspectRatio = imgHeight / imgWidth;

            const elem = document.createElement('div');
            elem.classList.add('gallery__item');
            elem.innerHTML = `<img class='gallery__img' src='${imgUrl}'>`;
            document.querySelector('.gallery').insertBefore(elem, document.querySelector('.gallery__break-line'));
            this.setElementHeight(elem, aspectRatio);
        })

        this.grid.setGalleryHeight();

    }

    setElementHeight(elem, ratio) {
        const elemWidth = elem.getBoundingClientRect().width;

        elem.style.height = `${elemWidth * ratio}px`;
        elem.firstChild.style.height = `${elemWidth * ratio}px`;
    }

    updateImgHeight() {
        const imgs = document.querySelectorAll('.gallery__item');
        imgs.forEach(img => {
            this.setElementHeight(img, img.firstChild.naturalHeight/img.firstChild.naturalWidth);
        });
        this.grid.setGalleryHeight();
    }
}