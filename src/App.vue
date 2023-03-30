<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {ref} from 'vue'

import {getProductsFromLocalStorage, setProductsToLocalStorage} from '@/utils'

import FirstStep from '@/components/FirstStep.vue'
import SecondStep from '@/components/SecondStep.vue'
import ThirdStep from '@/components/ThirdStep.vue'

let count = ref<number>(0)
const cartModal = ref<boolean>(false)
let step = ref<number>(1)
const successModal = ref<boolean>(false)

const amountOfProductsInCart = () => {
  count.value = getProductsFromLocalStorage().length
}
amountOfProductsInCart()

const stepChanger = (value: number) => {
  step.value = value
}

const closeHandler = () => {
  successModal.value = false
}

const orderHandler = () => {
  successModal.value = true
  cartModal.value = false
  step.value = 1

  setProductsToLocalStorage('[]')
  amountOfProductsInCart()
}

</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <RouterLink to="/">
          <v-icon color="white">mdi-home-variant-outline</v-icon>
        </RouterLink>
      </template>

      <v-app-bar-title>Store Application</v-app-bar-title>

      <template v-slot:append>
        <v-btn @click="cartModal = true" class="text-none" stacked>
          <v-badge :content="count" color="error">
            <v-icon>mdi-cart-variant</v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main style="width: 1000px">
      <RouterView @add-to-cart="amountOfProductsInCart"/>
    </v-main>
  </v-layout>

  <v-dialog v-model="cartModal" width="500">
    <first-step @step="stepChanger" @remove-from-cart="amountOfProductsInCart" v-if="step === 1"/>
    <second-step @step="stepChanger" @order="orderHandler" v-else/>
  </v-dialog>
  <v-dialog v-model="successModal" width="500">
    <third-step @close="closeHandler"/>
  </v-dialog>
</template>