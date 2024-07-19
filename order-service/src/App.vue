<script setup>
import { ref } from 'vue';
import ServiceOrder from "./components/ServiceOrder.vue";
import ViewOrders from './components/ViewOrders.vue';

const showViewOrders = ref(false);

const toggleViewOrders = () => {
  showViewOrders.value = !showViewOrders.value;
};
</script>

<template>
  <div>
    <button class="non-printable btn btn-primary mb-2 m-2" @click="toggleViewOrders" >
      {{ showViewOrders ? 'Ukryj listę zapisanych formularzy' : 'Pokaż listę zapisanych formularzy' }}
    </button>
    <ViewOrders v-if="showViewOrders" class="non-printable"/>
    <ServiceOrder v-if="!showViewOrders" class="non-printable"/>
  </div>
</template>

<style scoped>
/* Styl dla ukrywania elementów podczas drukowania */
@media print {
  .non-printable {
    display: none !important;
  }
}

/* Styl dla ServiceOrder */
input[type=text]:focus {
  background-color: rgb(12, 110, 151);
}
textarea {
  resize: none;
}
textarea:focus {
  background-color: rgb(3, 47, 66);
}
</style>