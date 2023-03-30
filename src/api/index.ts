import type {Product,ProductsFromApi} from "@/types";

const API_URL = 'https://dummyjson.com'

const getProducts: (category: string) => Promise<ProductsFromApi> = async category => {
    try {
        const response = await fetch(`${API_URL}/products/category/${category}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

const getProduct: (product: number) => Promise<Product> = async product => {
    try {
        const response = await fetch(`${API_URL}/products/${product}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

const getCategories: () => Promise<string[]> = async () => {
    try {
        const response = await fetch(`${API_URL}/products/categories`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (err) {
        console.error(err)
    }
}

export {getProducts, getProduct, getCategories}