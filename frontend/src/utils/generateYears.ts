const generateYears = () => {

    let years = [];
    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 5;

    for (let i = maxYear; i >= minYear; i--) {
        years.push(i)
    }
    
    return years
}

export default generateYears;