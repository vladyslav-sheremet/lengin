<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {onMounted, ref} from 'vue'

import {getCategories} from '@/api'

const categories = ref<string[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    categories.value = await getCategories()
    isLoading.value = false
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <h1>Category Page</h1>
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
          v-for="category in categories"
          :key="category">
        <v-card class="d-flex align-center justify-center">
          <template v-slot:title>
            <RouterLink :to="`/${category}`">{{ category }}</RouterLink>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>