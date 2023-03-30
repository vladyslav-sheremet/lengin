import type {ProductFromLocalStorage} from '@/types'
export const getProductsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('productsInCart') || '[]')
}

export const setProductsToLocalStorage = (data: ProductFromLocalStorage[] | '[]') => {
    if (data === '[]') {
        localStorage.setItem('productsInCart', '[]')
    } else {
        localStorage.setItem('productsInCart', JSON.stringify(data))
    }
}