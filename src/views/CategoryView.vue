<script setup lang="ts">
import {useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'

import {getProducts} from '@/api'
import type {Product} from "@/types";

const route = useRoute()
const products = ref<Product[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    const data = await getProducts(route.params.category as string)
    products.value = data.products
    isLoading.value = false
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div>
    Back to
    <RouterLink :to="`/`">categories</RouterLink>
    page
  </div>
  <h1>Category {{ $route.params.category }}</h1>
  <v-container class="bg-surface-variant d-flex justify-center">
    <v-progress-circular
        v-if="isLoading"
        :width="3"
        color="green"
        indeterminate
    ></v-progress-circular>
    <v-row v-else>
      <v-col
          cols="12"
          sm="4"
          v-for="product in products"
          :key="product"
      >
        <RouterLink :to="`/${$route.params.category}/${product.id}`">
          <v-card>
            <v-img
                :src="product.thumbnail"
                height="200px"
                cover
            ></v-img>
            <v-card-title>
              <h3>{{ product.title }}</h3>
              <p>{{ product.price }}$</p>
            </v-card-title>
          </v-card>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>