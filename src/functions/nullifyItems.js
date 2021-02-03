function nullifyItems() {
    if(localStorage.getItem('currentPoints')) {
        localStorage.setItem('currentPoints', '0');
    }
    if(localStorage.getItem('completedRoundsCounter')) {
        localStorage.setItem('completedRoundsCounter', '0');
    }
    if(localStorage.getItem('skippedRoundsCounter')) {
        localStorage.setItem('skippedRoundsCounter', '0');
    }
}

export default nullifyItems;