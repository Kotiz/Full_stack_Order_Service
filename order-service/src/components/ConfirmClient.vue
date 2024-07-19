<template>
    <div>
      <div class="row align-items-start pb-1">
        <div class="col pb-2">
          <img src="@/assets/scissors.svg" alt="" style="transform: rotate(90deg);">---------------------------------------------------------------------------------------------------
        </div>
      </div>
      <div class="row align-items-center pb-1 border border-top-1">
        <div class="col">
          Data przyjęcia:
        </div>
        <div class="col">
          {{ store.inputDateOfRecived }}
        </div>
      </div>
      <div class="row align-items-center pb-1">
        <div class="col">
          Dane klienta:
        </div>
        <div class="col text-uppercase fw-bold">
          {{ store.inputDataNameClient }}
        </div>
      </div>
      <div class="row align-items-center pb-1 border border-top-1">
        <div class="col">
          Nazwa urządzenia:
        </div>
        <div class="col text-uppercase">
          {{ store.inputDataDevice }}
        </div>
      </div>
      <div class="row align-items-end pb-1">
        <div class="col">
          Dodatkowe wyposażenie:
        </div>
        <div class="col text-uppercase">
          {{ store.inputDataDeviceEquipment }}
        </div>
      </div>
      <div style="height: 100px;" class="pt-1">
        <div class="mh-100 pt-1" style="width: 260px; height: 20px;">
          <p>HASH s.c.</p>
        </div>
        <div class="mh-100 pt-1" style="width: 260px; height: 20px;">
          <p>ul. Nojego 1E</p>
        </div>
        <div class="mh-100 pt-1" style="width: 260px; height: 20px;">
          <p>32-600 Oświęcim</p>
        </div>
        <div class="mh-100 pt-1" style="width: 260px; height: 20px;">
          <p>NIP: 5511755110</p>
        </div>
        <div class="mh-100 pt-1" style="width: 260px; height: 20px;">
          <p>tel.: 33 842 52 33</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { store } from '@/stores/store.ts';
  
  const props = defineProps(['inputDataDevice','inputDataNameClient','inputDateOfRecived','inputDataDeviceEquipment']);
  </script>
  
  <style scoped>
  hr {
      border-top: 1px dotted black;
      width: 200px;
  }
  </style>
  