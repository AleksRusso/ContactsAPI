const apiUrl = 'https://localhost:7142/api/contacts';

// Загрузка всех контактов при загрузке страницы
window.onload = async function() {
    await loadContacts();
};

// Функция для загрузки всех контактов
async function loadContacts() {
    const response = await fetch(apiUrl);
    const contacts = await response.json();
    const contactsTable = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
    contactsTable.innerHTML = ''; // Очищаем таблицу перед добавлением данных

    contacts.forEach(contact => {
        const row = contactsTable.insertRow();
        row.insertCell(0).innerText = contact.id;
        row.insertCell(1).innerText = contact.fullName;
        row.insertCell(2).innerText = contact.email;
        row.insertCell(3).innerText = contact.phone;
        row.insertCell(4).innerText = contact.address;
        row.insertCell(5).innerHTML = `
            <button onclick="editContact('${contact.id}')">Edit</button>
            <button onclick="deleteContact('${contact.id}')">Delete</button>
        `;
    });
}

// Функция для добавления или обновления контакта
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const contactId = document.getElementById('contactId').value;
    const contact = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };
    
    if (contactId) {
        // Обновление контакта
        await fetch(`${apiUrl}/${contactId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
    } else {
        // Добавление нового контакта
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
    }

    await loadContacts(); // Перезагружаем список контактов
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = '';
});

// Функция для поиска контакта по ID
async function getContactById() {
    const id = document.getElementById('searchId').value;

    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    contactTable.innerHTML = ''; // Очищаем таблицу

    if (id) {
        const response = await fetch(`${apiUrl}/${id}`);

        if (response.ok) {
            const contact = await response.json();
            const row = contactTable.insertRow();
            row.insertCell(0).innerText = contact.id;
            row.insertCell(1).innerText = contact.fullName;
            row.insertCell(2).innerText = contact.email;
            row.insertCell(3).innerText = contact.phone;
            row.insertCell(4).innerText = contact.address;

          
        } else {
            alert('Contact not found');
        }
    } else {
        alert('Please enter a contact ID');
    }
}

// Функция для удаления контакта
async function deleteContact(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    await loadContacts();
}

// Функция для редактирования контакта
function editContact(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(contact => {
            document.getElementById('contactId').value = contact.id;
            document.getElementById('fullName').value = contact.fullName;
            document.getElementById('email').value = contact.email;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('address').value = contact.address;
        });
}
