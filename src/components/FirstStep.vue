<script setup lang="ts">
import {defineEmits, ref} from 'vue'

import {getProductsFromLocalStorage, setProductsToLocalStorage} from '@/utils'
import type {ProductFromLocalStorage} from '@/types'

let orders = ref<ProductFromLocalStorage[]>([])
const emit = defineEmits<{
  (e: 'remove-from-cart'): void,
  (e: 'step', id: number): void
}>()

orders.value = getProductsFromLocalStorage()

const removeFromLocalStorage = (id: number) => {
  let products = getProductsFromLocalStorage()
  products = products.filter((i: ProductFromLocalStorage) => i.id !== id)
  orders.value = orders.value.filter((i: ProductFromLocalStorage) => i.id !== id)
  setProductsToLocalStorage(products)

  emit('remove-from-cart')
}

const stepHandler = () => emit('step', 2)
</script>

<template>
  <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
  >

    <h2 class="text-h5 mb-6">Products in your cart</h2>
    <v-list v-if="orders.length">
      <v-list-item
          v-for="order in orders"
          :key="order.title"
          :title="order.title"
          :subtitle="`${order.price}$`"
      >
        <template v-slot:prepend>
          <v-img
              :width="200"
              aspect-ratio="16/9"
              cover
              :src="order.thumbnail"
          ></v-img>
        </template>

        <template v-slot:append>
          <v-btn
              color="grey-lighten-1"
              icon="mdi-close-circle"
              variant="text"
              @click="removeFromLocalStorage(order.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <p v-else>There are nothing in your cart</p>

    <p class="mb-4 text-medium-emphasis text-body-2">
      If you find that you have randomly selected products, you can proceed to the next step
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
<!--      <v-btn-->
<!--          class="text-none"-->
<!--          color="success"-->
<!--          rounded-->
<!--          variant="flat"-->
<!--          width="90"-->
<!--          :disabled="!orders.length"-->
<!--          @click="$emit('step', 2)"-->
<!--      >-->
<!--        Next-->
<!--      </v-btn>-->
      <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
          :disabled="!orders.length"
          @click="stepHandler"
      >
        Next
      </v-btn>
    </div>
  </v-sheet>
</template>