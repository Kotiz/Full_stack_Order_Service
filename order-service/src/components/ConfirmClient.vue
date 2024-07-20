<template>
    <div>
        <div class="row align-items-start pb-1">
            <div class="col pb-2">
            <!-- <div class="containerConfirmClientCutPaper">
                <div class="containerConfirmClientCutPaper"><img src="@/assets/scissors.svg" alt="" style="transform: rotate(90deg);"></div>
                <div class="containerConfirmClientCutPaper">---------------------------------------------------------------------------------------------------</div>   
            </div> -->
                <div class="cut-line-container">
                    <img src="@/assets/scissors.svg" alt="Nożyczki" class="scissors-icon">
                    <hr class="cut-line">
                </div>
            </div>
        </div>
    <div >
        <div class="row align-items-center pb-1 border border-top-1 styled-row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 styled-label">Data przyjęcia:</div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 styled-value">{{ store.inputDateOfRecived }}</div>
        </div>
        <div class="row align-items-center pb-1 border border-top-1 styled-row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 styled-label">Dane klienta:</div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 styled-value text-uppercase fw-bold">{{ displayData.inputDataNameClient }}</div>
        </div>
        <div class="row align-items-center pb-1 border border-top-1 styled-row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 styled-label">Nazwa urządzenia:</div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 styled-value text-uppercase">{{ store.inputDataDevice }}</div>
        </div>
        <div class="row align-items-center pb-1 border border-top-1 styled-row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 styled-label accordion ">Dodatkowe wyposażenie:</div>
            <div class="col-12 col-sm-6 col-md-8 col-lg-9 styled-value text-uppercase">{{ store.inputDataDeviceEquipment }}</div>
        </div>
    </div>

    <div >
        <div class="row align-items-center pb-1 styled-rowFooter p-1">
            <div class="col-md-4 styled-logo">
                <img src="@/assets/LogoHash.png" style="width: 140px; height: 80px;" alt="Logo" class="img-fluid">
            </div>
            <div class="col-md-8 styled-infoFooter">
                <p>ul. Nojego 1E</p>
                <p>32-600 Oświęcim</p>
                <p>NIP: 5511755110</p>
                <p>tel.: 33 842 52 33</p>
            </div>
        </div>   
    </div>
</div>   
</template>

<script setup>
    import { defineProps } from 'vue';
    import { store } from '@/stores/store.ts';

    const props = defineProps({
    displayData: {
    type: Object,
    required: true
    }
});
</script>

<style scoped>
@import "@/styles/main.css"

</style>