export const getProductsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('productsInCart') || '[]')
}

export const setProductsToLocalStorage = data => {
    if (data === '[]') {
        localStorage.setItem('productsInCart', '[]')
    } else {
        localStorage.setItem('productsInCart', JSON.stringify(data))
    }
}