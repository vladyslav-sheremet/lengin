<script setup lang="ts">
import {defineEmits, reactive, ref} from 'vue'

import {getProductsFromLocalStorage} from '@/utils'
import type {Order, ProductFromLocalStorage} from '@/types'

const emit = defineEmits<{
  (e: 'order'): void
}>()

let order = ref<Order>({} as Order)
const cities = reactive<string[]>([
  'Kyiv',
  'Kharkiv',
  'Odessa',
  'Kramatorsk'
])
const city = ref<string | null>(null)
const orderForm = ref<HTMLFormElement | null>(null)

const firstNameIsValid = ref<boolean>(false)
const lastNameIsValid = ref<boolean>(false)
const phoneIsValid = ref<boolean>(false)
const emailIsValid = ref<boolean>(false)
const cityIsValid = ref<boolean>(false)
const deliveryIsValid = ref<boolean>(false)
const paymentIsValid = ref<boolean>(false)

let products = getProductsFromLocalStorage()
products = products.map((product: ProductFromLocalStorage) => product.id)
order.value.productsId = products

const firstNameRules = [
  (value: string) => {
    if (value?.length >= 3 && value?.length <= 20) {
      firstNameIsValid.value = true
      return true
    } else if (value) {
      firstNameIsValid.value = false
      return 'The name must be at least 3 characters and not more than 20'
    } else {
      firstNameIsValid.value = false
      return 'First Name is required'
    }
  },
]

const lastNameRules = [
  (value: string) => {
    if (value?.length >= 3 && value?.length <= 20) {
      lastNameIsValid.value = true
      return true
    } else if (value) {
      lastNameIsValid.value = false
      return 'The name must be at least 3 characters and not more than 20'
    } else {
      lastNameIsValid.value = false
      return 'Last Name is required'
    }
  },
]

const phoneRules = [
  (value: string) => {
    if (value?.length > 9 && /[0-9-]+/.test(value)) {
      phoneIsValid.value = true
      return true
    } else if (value) {
      phoneIsValid.value = false
      return 'Phone number needs to be at least 9 digits'
    } else {
      phoneIsValid.value = false
      return 'Last Name is required'
    }
  },
]

const emailRules = [
  (value: string) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
      emailIsValid.value = true
      return true
    } else if (value) {
      emailIsValid.value = false
      return 'Must be a valid e-mail'
    } else {
      emailIsValid.value = false
      return 'Last Name is required'
    }
  },
]

const cityRules = [
  (value: string) => {
    if (value) {
      cityIsValid.value = true
      order.value.city = city.value
      return true
    } else {
      cityIsValid.value = false
      return 'City is required'
    }
  },
]

const deliveryRules = [
  (value: string) => {
    if (value) {
      deliveryIsValid.value = true
      return true
    } else {
      deliveryIsValid.value = false
      return 'City is required'
    }
  },
]

const paymentRules = [
  (value: string) => {
    if (value) {
      paymentIsValid.value = true
      return true
    } else {
      paymentIsValid.value = false
      return 'City is required'
    }
  },
]

const orderHandler = async () => {
  const isValid = await orderForm.value?.validate()

  if (!isValid.valid) {
    return
  } else {
    emit('order')
    console.log('imitation of a successful order', order.value)
  }
}
</script>

<template>
  <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
  >

    <h2 class="text-h5 mb-6">Ordering</h2>
    <p>Your contact details</p>
    <v-form ref="orderForm">
      <v-text-field
          v-model="order.firstName"
          label="First Name"
          required
          :rules="firstNameRules"
      ></v-text-field>
      <v-text-field
          v-model="order.lastName"
          label="Last Name"
          required
          :rules="lastNameRules"
      ></v-text-field>
      <v-text-field
          v-model="order.phone"
          label="Phone"
          required
          :rules="phoneRules"
      ></v-text-field>
      <v-text-field
          v-model="order.email"
          label="Email"
          required
          :rules="emailRules"
      ></v-text-field>

      <p>Delivery</p>

      <v-select
          v-model="city"
          :items="cities"
          :rules="cityRules"
          label="City"
          required
      ></v-select>
      <v-radio-group v-model="order.delivery" :rules="deliveryRules">
        <v-radio label="Pickup from our stores" value="Pickup from our stores"></v-radio>
        <v-radio label="Courier at your address" value="Courier at your address"></v-radio>
        <v-radio label="Pickup from the Post Office" value="Pickup from the Post Office"></v-radio>
      </v-radio-group>

      <p>Payment Methods</p>

      <v-radio-group v-model="order.payment" :rules="paymentRules">
        <v-radio label="Payment upon receipt of goods" value="Payment upon receipt of goods"></v-radio>
        <v-radio label="Pay now" value="Pay now"></v-radio>
        <v-radio label="Loan and installments" value="Loan and installments"></v-radio>
      </v-radio-group>
    </v-form>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end d-flex justify-space-between">
      <v-btn
          class="text-none"
          color="error"
          rounded
          variant="flat"
          width="90"
          @click="$emit('step', 1)"
      >
        Previous
      </v-btn>
      <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
          :disabled="!firstNameIsValid || !lastNameIsValid || !phoneIsValid || !emailIsValid || !cityIsValid || !deliveryIsValid || !paymentIsValid"
          @click="orderHandler"
      >
        Order
      </v-btn>
    </div>
  </v-sheet>
</template>