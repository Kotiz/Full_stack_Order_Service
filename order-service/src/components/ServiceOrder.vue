<template>
  <form @submit.prevent="submitForm">
    <div class="row g-3">
      <div class="col-sm-3">
        <label for="date" class="form-label rounded-pill text-bg-light badge"> Data :</label>
        <!-- <input type="date" v-model="displayData.inputDateOfRecived" class="form-control" id="date"> -->
        <input type="date" v-model="displayData.inputDateOfRecived" class="form-control form-control-sm" id="date">
      </div>
      <div class="col-sm-4">
        <label for="name" class="form-label rounded-pill text-bg-light badge">Imię i nazwisko</label>
        <input type="text" v-model="displayData.inputDataNameClient"  class="form-control form-control-sm" id="name">
      </div>
      <div class="col-sm-3">
        <label for="phone" class="form-label rounded-pill text-bg-light badge">Telefon</label>
        <input type="text" v-model="displayData.inputDataPhoneNumber" class="form-control form-control-sm" id="phone">
      </div>
      <div class="col-sm-1">
        <label for="release" class="form-label rounded-pill text-bg-light badge">Do wyd.</label>
        <input type="text" class="form-control form-control-sm" id="release" readonly :value="store.releaseInfo" disabled>
      </div>
      <div class="col-sm-1">
        <label for="info" class="form-label rounded-pill text-bg-light badge">Poinfo.</label>
        <input type="text" class="form-control form-control-sm" id="info" readonly :value="store.info" disabled>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="device" class="form-label rounded-pill text-bg-light badge">Urządzenie</label>
        <input type="text" v-model="displayData.inputDataDevice" class="form-control form-control-sm" id="device">
      </div>
      <div class="col-sm">
        <label for="equipment" class="form-label rounded-pill text-bg-light badge">Dodatkowe wyposażenie</label>
        <input type="text" v-model="displayData.inputDataDeviceEquipment" class="form-control form-control-sm" id="equipment">
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm-5">
        <label for="password" class="form-label rounded-pill text-bg-light badge">Hasło</label>
        <input type="text" class="form-control form-control-sm" id="password">
      </div>
      <div class="col-sm-3">
        <label for="price" class="form-label rounded-pill text-bg-light badge">Cena</label>
        <input type="text" class="form-control  form-control-sm" id="price" readonly :value="store.price" disabled>
      </div>
      <div class="col-sm-3" style="padding-top: 3%;">
        <div>
          <label for="formNumber" class="form-label rounded-pill text-bg-light badge ">Numer Formularza : </label>
          <span style="font-size:larger"> {{ store.formNumber }}  </span>
        </div>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="issue" class="badge rounded-pill text-bg-light">Zgłaszana usterka</label>
        <textarea
          class="form-control form-control-sm fixed-size-textarea" 
          id="issue" 
          rows="12" 
          maxlength="600" 
          v-model="displayData.inputDataCaseContent"
          @input="validateInput"
          required 
          ></textarea>
        <small class="text-muted"> pozostało {{ remainingCharacters }} znaków / </small>
        <small class="text-muted"> pozostało {{ remainingLines }} linii</small>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-sm">
        <label for="tasks" class="badge rounded-pill text-bg-light">Wykonane czynności</label>
        <textarea 
          class="form-control form-control-sm fixed-size-textarea" 
          id="issue" 
          rows="10" 
          maxlength="600" 
          disabled
          required
          ></textarea>
      </div>
    </div>
    <div class="pt-2 pb-2">
      <button type="submit" id="buttonVisibility" class="d-print-none btn btn-primary">Zapisz i wydrukuj stronę</button>
    </div>
  </form>
   <!-- Przekazywanie danych do komponentu ConfirmClient -->
  <ConfirmClient :displayData="displayData" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { store } from '@/stores/store.ts';
import ConfirmClient from "@/components/ConfirmClient.vue";
import { computed } from 'vue';

// Funkcja do obliczania bieżącej daty w formacie yyyy-mm-dd
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Miesiące są 0-indeksowane
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Inicjalizacja bieżącej daty
onMounted(() => {
  displayData.value.inputDateOfRecived = getCurrentDate();
});

const displayData = ref({
  inputDateOfRecived: '',
  inputDataNameClient: '',
  inputDataNameClientFull: '',
  inputDataPhoneNumber: '',
  inputDataDevice: '',
  inputDataDeviceEquipment: '',
  inputDataCaseContent: ''
});



const displayCaseData = ref({
  inputDataCaseContent: '',
});

const maxCharacters = 600;
const maxLines = 12;
const remainingCharacters = ref(maxCharacters);
const remainingLines = ref(maxLines);

watch(() => displayCaseData.value.inputDataCaseContent, (newVal) => {
  updateCharacterCount();
  updateLineCount();
});

function updateCharacterCount() {
  remainingCharacters.value = maxCharacters - displayCaseData.value.inputDataCaseContent.length;
}

function updateLineCount() {
  const lines = displayCaseData.value.inputDataCaseContent.split('\n').length;
  remainingLines.value = maxLines - lines;
}

function validateInput(event) {
  const content = event.target.value;
  const lines = content.split('\n').length;

  if (content.length > maxCharacters) {
    event.target.value = content.slice(0, maxCharacters);
  }

  if (lines > maxLines) {
    const truncatedContent = content.split('\n').slice(0, maxLines).join('\n');
    event.target.value = truncatedContent;
  }

  displayCaseData.value.inputDataCaseContent = event.target.value;
  updateCharacterCount();
  updateLineCount();
}

// Funkcja do formatowania daty na dd/mm/yy
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące są 0-indeksowane
  const year = date.getFullYear().toString().slice(-2); // Pobierz ostatnie 2 cyfry roku
  return `${day}/${month}/${year}`;
}

// Oblicz bieżącą datę w formacie dd/mm/yy
const currentDate = computed(() => {
  const now = new Date();
  return formatDate(now);
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
@import "@/styles/main.css"
</style>
