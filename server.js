const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Ustawienie ścieżki do katalogu i pliku
const formsDirPath = path.join(__dirname, 'save-form');
const formsFilePath = path.join(formsDirPath, 'forms.json');

// Utworzenie katalogu, jeśli nie istnieje
if (!fs.existsSync(formsDirPath)) {
    fs.mkdirSync(formsDirPath);
}

// Funkcja do odczytu formularzy z pliku
const readForms = () => {
    if (!fs.existsSync(formsFilePath)) {
        return [];
    }
    const data = fs.readFileSync(formsFilePath);
    return JSON.parse(data);
};

// Funkcja do zapisu formularzy do pliku
const writeForms = (forms) => {
    fs.writeFileSync(formsFilePath, JSON.stringify(forms, null, 2));
};

// Funkcja do uzyskania aktualnej daty w formacie MM-YYYY
const getCurrentDate = () => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${month}-${year}`;
};

// Endpoint do zapisu formularza
app.post('/save-form', (req, res) => {
    const forms = readForms();
    const lastForm = forms[forms.length - 1];
    const currentDate = getCurrentDate();
    let newFormNumber = 1;

    if (lastForm && lastForm.date === currentDate) {
        newFormNumber = lastForm.number + 1;
    }

    const newForm = { number: newFormNumber, date: currentDate, isChecked: false, ...req.body };

    forms.push(newForm);
    writeForms(forms);

    res.json({ message: 'Form saved', formNumber: `${newFormNumber}/${currentDate}` });
});

// Endpoint do pobierania wszystkich formularzy
app.get('/forms', (req, res) => {
    const forms = readForms();
    res.json(forms);
});

// Endpoint do usuwania formularzy
app.delete('/delete-forms', (req, res) => {
    const formsToDelete = req.body;
    let forms = readForms();
    forms = forms.filter(form => !formsToDelete.some(delForm => delForm.number === form.number));
    writeForms(forms);
    res.json({ message: 'Forms deleted' });
});

// Endpoint do aktualizacji stanu zaznaczenia formularzy
app.put('/update-forms', (req, res) => {
    const updatedForms = req.body;
    let forms = readForms();

    updatedForms.forEach(updatedForm => {
        const index = forms.findIndex(form => form.number === updatedForm.number);
        if (index !== -1) {
            forms[index].isChecked = updatedForm.isChecked;
        }
    });

    writeForms(forms);
    res.json({ message: 'Forms updated' });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
