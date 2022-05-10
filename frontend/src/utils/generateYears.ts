const generateYears = () => {

    let years = [];
    const maxYear = 2024;
    const minYear = maxYear - 5;

    for (let i = maxYear; i >= minYear; i--) {
        years.push(i)
    }
    
    return years
}

export default generateYears;