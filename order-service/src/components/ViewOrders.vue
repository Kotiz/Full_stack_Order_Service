<template>
    <div>
        <h2>Lista zapisanych formularzy</h2>
        <button @click="saveSelectedRows" class="btn btn-primary mb-2 m-2">Zapisz zaznaczone wiersze</button>
        <button @click="showDeleteConfirmation = true" class="btn btn-danger mb-2 m-2">Usuń zaznaczone wiersze</button>
        
        <!-- Modal do wprowadzenia hasła -->
        <div class="modal" :class="{ 'is-active': showDeleteConfirmation }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Potwierdzenie usunięcia</p>
                    <button class="delete btn btn-primary mb-2" aria-label="close" @click="showDeleteConfirmation = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label m-2">A po co to usuwać ? To nie dobre jest ! Podaj hasło mastera:</label>
                        <div class="control">
                            <input v-model="password" type="password" class="form-control">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger btn btn-primary m-2" @click="deleteSelectedRows()">Usuń</button>
                    <button class="button btn btn-primary m-2" @click="showDeleteConfirmation = false">Anuluj</button>
                </footer>
            </div>
        </div>
        
        <!-- Modal do wyświetlenia opisu usterki-->
        <div class="modal" :class="{ 'is-active': showDataCaseContent }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Opis usterki</p>
                    <button class="delete btn btn-primary mb-2" aria-label="close" @click="showDataCaseContent = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field" v-if="selectedFormIndex !== null">
                        <label class="label m-2"> {{ forms[selectedFormIndex].inputDataCaseContent }}</label>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button btn btn-primary m-2" @click="showDataCaseContent = false">Zamknij</button>
                </footer>
            </div>
        </div>

        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th><input type="checkbox" @change="toggleSelectAll" v-model="selectAll"></th>
                        <th>Numer</th>
                        <th>Data przyjęcia</th>
                        <th>Imię i nazwisko klienta</th>
                        <th>Numer telefonu</th>
                        <th>Urządzenie</th>
                        <th>Dodatkowe wyposażenie</th>
                        <th>Zgłaszana usterka</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(form, index) in forms" :key="form.number"
                        :class="{ 'table-success': form.isChecked }"
                        @click="toggleRow(index)">
                        <td><input type="checkbox" v-model="selectedRows" :value="index" @click.stop></td>
                        <td style="width: 15px;">{{ form.number }}</td>
                        <td style="width: 100px;">{{ form.inputDateOfRecived }}</td>
                        <td style="width: 150px;">{{ form.inputDataNameClient }}</td>
                        <td style="width: 120px;">{{ form.inputDataPhoneNumber }} / {{ form.inputDataPhoneNumberFull }}</td>
                        <td>{{ form.inputDataDevice }}</td>
                        <td style="width: 100px;">{{ truncateText(form.inputDataDeviceEquipment, 20) }}</td>
                        <td>
                            <div class="containerButtonShowMore">
                                <div class="boxShowMore">
                                    {{ truncateText(form.inputDataCaseContent, 15) }}
                                </div>
                                <div class="boxShowMore">
                                    <button @click.stop="showDataCaseContentModal(index)" class="btn btn-outline-secondary btn-sm">więcej...</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                inputDateOfRecived: '',
                inputDataNameClient: '',
                inputDataPhoneNumberFull: '',
                inputDataPhoneNumber: '',
                inputDataDevice: '',
                inputDataDeviceEquipment: '',
                inputDataCaseContent: '',
            },
            forms: [],
            selectedRows: [],
            selectAll: false,
            showDeleteConfirmation: false,
            showDataCaseContent: false,
            password: '',
            selectedFormIndex: null, // Dodane pole do przechowywania indeksu wybranego wpisu
        };
    },
    methods: {
        async submitForm() {
            this.form.inputDataPhoneNumberFull = this.form.inputDataPhoneNumber;
            try {
                const response = await fetch('http://localhost:3000/save-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                });
                const data = await response.json();
                this.formNumber = data.formNumber;
                this.fetchForms();
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchForms() {
            try {
                const response = await fetch('http://localhost:3000/forms');
                this.forms = await response.json();
                this.selectAll = false;
                this.selectedRows = [];
            } catch (error) {
                console.error('Error:', error);
            }
        },
        toggleSelectAll() {
            this.selectedRows = this.selectAll ? this.forms.map((_, index) => index) : [];
        },
        toggleRow(index) {
            const form = this.forms[index];
            form.isChecked = !form.isChecked;
            this.$set(this.forms, index, form);
        },
        async saveSelectedRows() {
            try {
                const response = await fetch('http://localhost:3000/update-forms', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.forms),
                });
                if (response.ok) {
                    console.log('Zapisano zaznaczone wiersze');
                } else {
                    console.error('Błąd podczas zapisywania wierszy:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async deleteSelectedRows() {
            // Sprawdzenie hasła przed usunięciem
            if (this.password !== 'tylkokonradtomoze') {
                alert('Niepoprawne hasło! Wprowadź hasło "szefa serwisu i wszystkiego co na kartce", aby kontynuować.');
                return;
            }

            try {
                const selectedForms = this.selectedRows.map((index) => this.forms[index]);
                const response = await fetch('http://localhost:3000/delete-forms', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedForms),
                });
                if (response.ok) {
                    this.fetchForms();
                    this.selectedRows = [];
                    this.showDeleteConfirmation = false; // Ukryj modal po pomyślnym usunięciu
                } else {
                    console.error('Błąd podczas usuwania wierszy:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        showDataCaseContentModal(index) {
            this.selectedFormIndex = index;
            this.showDataCaseContent = true;
        },
        truncateText(text, maxLength) {
    if (!text) return ''; // Sprawdzenie, czy text jest undefined lub null
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  },
    },
    mounted() {
        this.fetchForms();
    },
};
</script>

<style scoped>
@import "@/styles/main.css"
</style>
