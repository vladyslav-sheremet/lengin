<template>
  <v-sheet
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
  >
    <v-icon
        class="mb-5"
        color="success"
        icon="mdi-check-circle"
        size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">Your order has been successfully sent</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Our specialist will contact you within 24 hours to confirm and clarify the order
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
          class="text-none"
          color="success"
          rounded
          variant="flat"
          width="90"
          @click="$emit('close')"
      >
        Done
      </v-btn>
    </div>
  </v-sheet>
</template>