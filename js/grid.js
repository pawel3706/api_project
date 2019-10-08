class Grid {
    constructor() {
        this.gallery = document.querySelector('.gallery');
        this.colNum = 4; 
        this.gridColumnsHeight = [];
    }
    
    setGalleryHeight() {
    
        this.gridColumnsHeight.length = 0;
    
        const galleryItems = document.querySelectorAll('.gallery__item');
        galleryItems.forEach(item => {
            const index = window.getComputedStyle(item).order - 1;
            const itemHeight = parseFloat(item.style.height) + parseFloat(window.getComputedStyle(item).marginBottom);
            console.log(parseFloat(window.getComputedStyle(item).marginBottom))
    
            this.gridColumnsHeight[index] === undefined ? this.gridColumnsHeight[index] = itemHeight : this.gridColumnsHeight[index] += itemHeight ;
        })
    
        this.gallery.style.height = `${Math.max(...this.gridColumnsHeight) + 1}px`;
        // adding 1px fix bug in firefox which appears when you type Britney Spears
    }
    
    createBreakLines() {
        for(let i=0; i < this.colNum -1; i++) {
            const breakLine = document.createElement('div');
            breakLine.setAttribute('class', 'gallery__break-line');
            this.gallery.appendChild(breakLine);
        }
    }
}