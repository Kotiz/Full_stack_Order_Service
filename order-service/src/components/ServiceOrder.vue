<template>
  <form @submit.prevent="submitForm">
    <div class="row g-3">
      <div class="col-sm-3">
        <label for="date" class="form-label rounded-pill text-bg-light badge">Data przyjęcia</label>
        <input type="date" v-model="displayData.inputDateOfRecived" class="form-control" id="date">
      </div>
      <div class="col-sm-4">
        <label for="name" class="form-label rounded-pill text-bg-light badge">Imię i nazwisko</label>
        <input type="text" v-model="displayData.inputDataNameClient" class="form-control" id="name">
      </div>
      <div class="col-sm">
        <label for="phone" class="form-label rounded-pill text-bg-light badge">Telefon</label>
        <input type="text" v-model="displayData.inputDataPhoneNumber" class="form-control" id="phone">
      </div>
      <div class="col-sm-1">
        <label for="release" class="form-label rounded-pill text-bg-light badge">Do wyd.</label>
        <input type="text" class="form-control" id="release" readonly :value="store.releaseInfo">
      </div>
      <div class="col-sm-1">
        <label for="info" class="form-label rounded-pill text-bg-light badge">Poinfo.</label>
        <input type="text" class="form-control" id="info" readonly :value="store.info">
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="device" class="form-label rounded-pill text-bg-light badge">Urządzenie</label>
        <input type="text" v-model="displayData.inputDataDevice" class="form-control" id="device">
      </div>
      <div class="col-sm">
        <label for="equipment" class="form-label rounded-pill text-bg-light badge">Dodatkowe wyposażenie</label>
        <input type="text" v-model="displayData.inputDataDeviceEquipment" class="form-control" id="equipment">
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm-5">
        <label for="password" class="form-label rounded-pill text-bg-light badge">Hasło</label>
        <input type="text" class="form-control" id="password">
      </div>
      <div class="col-sm-3">
        <label for="price" class="form-label rounded-pill text-bg-light badge">Cena</label>
        <input type="text" class="form-control" id="price" readonly :value="store.price">
      </div>
      <div class="col-sm-3" style="padding-top: 3%;">
        <div>
          <label for="formNumber" class="form-label rounded-pill text-bg-light badge">Numer Formularza</label>
          <span style="font-size: x-large;">{{ store.formNumber }}</span>
        </div>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="issue" class="badge rounded-pill text-bg-light">Zgłaszana usterka</label>
        <textarea class="form-control" id="issue" rows="8" maxlength="400" v-model="displayData.inputDataCaseContent" required></textarea>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="tasks" class="badge rounded-pill text-bg-light">Wykonane czynności</label>
        <textarea class="form-control" id="tasks" rows="8" maxlength="400"></textarea>
      </div>
    </div>
    <div class="pt-2 pb-2">
      <button type="submit" id="buttonVisibility" class="d-print-none btn btn-primary">Zapisz i wydrukuj stronę</button>
    </div>
  </form>
  <ConfirmClient />
</template>

<script setup>
import { ref, watch } from 'vue';
import { store } from '@/stores/store.ts';
import ConfirmClient from "@/components/ConfirmClient.vue";

const displayData = ref({
  inputDateOfRecived: '',
  inputDataNameClient: '',
  inputDataPhoneNumber: '',
  inputDataDevice: '',
  inputDataDeviceEquipment: '',
  inputDataCaseContent: ''
});

watch(() => displayData.value.inputDataPhoneNumber, (newVal) => {
  store.inputDataPhoneNumber = abbreviatePhoneNumber(newVal);
});

watch(() => displayData.value.inputDataNameClient, (newVal) => {
  store.inputDataNameClient = abbreviateName(newVal);
});

watch(() => displayData.value.inputDateOfRecived, (newVal) => {
  store.inputDateOfRecived = newVal;
});

watch(() => displayData.value.inputDataDevice, (newVal) => {
  store.inputDataDevice = newVal;
});

watch(() => displayData.value.inputDataDeviceEquipment, (newVal) => {
  store.inputDataDeviceEquipment = newVal;
});

watch(() => displayData.value.inputDataCaseContent, (newVal) => {
  store.inputDataCaseContent = newVal;
});

function abbreviateName(name) {
  if (!name) return '';
  const parts = name.split(' ');
  const abbreviated = parts.map(part => part.length > 3 ? part.slice(0, 3) : part).join(' ');
  return abbreviated;
}

function abbreviatePhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';
  return phoneNumber.slice(-4);
}

async function submitForm() {
  try {
    const response = await fetch('http://localhost:3000/save-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(store)
    });
    const data = await response.json();
    store.formNumber = data.formNumber;
    fetchForms(); // Pobierz zaktualizowaną listę formularzy
    window.print(); // Przenieś funkcję print do submitForm
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchForms() {
  try {
    const response = await fetch('http://localhost:3000/forms');
    const forms = await response.json();
    if (forms.length > 0) {
      store.formNumber = forms[forms.length - 1].number + 1;
    } else {
      store.formNumber = 1;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchForms(); // Pobierz listę formularzy przy montowaniu komponentu
</script>

<style scoped>
input[type=text]:focus {
  background-color: rgb(230, 242, 247);
}
textarea {
  resize: none;
}
textarea:focus {
  background-color: rgb(230, 242, 247);
}
</style>
