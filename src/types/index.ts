export interface Product {
    brand: string
    category: string
    description: string
    discountPercentage: number
    id: number
    images: string[]
    price: number
    rating: number
    stock: number
    thumbnail: string
    title: string
}

export interface ProductFromLocalStorage {
    thumbnail: string,
    title: string,
    price: number,
    id: number
}

export interface Order {
    delivery: string
    email: string
    firstName: string
    lastName: string
    payment: string
    phone: string
    productsId: number[]
    city: string | null
}

export interface ProductsFromApi {
    products: Product[]
    total: number
    skip: number
    limit: number
}