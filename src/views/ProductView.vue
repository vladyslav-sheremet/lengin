<script setup lang="ts">
import {useRoute} from 'vue-router'
import {defineEmits, onMounted, ref} from 'vue'

import {getProduct} from '@/api'
import {getProductsFromLocalStorage, setProductsToLocalStorage} from '@/utils'
import type {Product, ProductFromLocalStorage} from '@/types'

const route = useRoute()
let product = ref<Product>({} as Product)
const isLoading = ref<boolean>(true)
const emit = defineEmits<{
  (e: 'add-to-cart'): void
}>()

onMounted(async () => {
  try {
    product.value = await getProduct(+route.params.product)
    isLoading.value = false
  } catch (err) {
    console.error(err)
  }
})

const addToCart = () => {
  let local = getProductsFromLocalStorage()

  const newProduct = {
    thumbnail: product.value.thumbnail,
    title: product.value.title,
    price: product.value.price,
    id: product.value.id
  }

  if (!local.find((i: ProductFromLocalStorage) => i.id === newProduct.id)) {
    local.push(newProduct)
    setProductsToLocalStorage(local)
    emit('add-to-cart')
  }
}
</script>

<template>
  <div class="mb-2">
    Back to
    <RouterLink :to="`/${$route.params.category}`">{{ $route.params.category }}</RouterLink>
    page
  </div>
  <div class="d-flex justify-center">
    <v-progress-circular
        v-if="isLoading"
        :width="3"
        color="green"
        indeterminate
    ></v-progress-circular>
    <v-card v-else>
      <v-carousel>
        <v-carousel-item
            v-for="img in product.images"
            :src="img"
            :key="img"
            cover
        ></v-carousel-item>
      </v-carousel>
      <v-card-title class="d-flex justify-space-between align-center">
        <h3>{{ product.brand }} {{ product.title }}</h3>
        <v-chip
            class="ma-2"
            color="green"
            text-color="white"
        >
          {{ product.price }}$
        </v-chip>
      </v-card-title>
      <v-card-subtitle>
        {{ product.description }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
            class="text-none mx-auto"
            color="success"
            rounded
            variant="flat"
            width="120"
            @click="addToCart"
        >
          Add to cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>