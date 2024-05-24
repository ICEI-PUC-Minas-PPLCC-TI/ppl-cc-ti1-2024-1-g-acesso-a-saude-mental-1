let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function generateCalendar(month, year) {
    const monthYearElement = document.getElementById('monthYear');
    monthYearElement.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.innerText = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                const button = document.createElement('button');
                button.innerText = date;
                button.addEventListener('click', () => {
                    const selectedButton = document.querySelector('.selected');
                    if (selectedButton) {
                        selectedButton.classList.remove('selected');
                    }
                    button.classList.add('selected');
                    const formContainer = document.getElementById('formContainer');
                    formContainer.style.display = 'block';
                    document.getElementById('eventDate').value = `${year}-${month + 1}-${button.textContent}`;
                });
                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    button.classList.add('today');
                }
                cell.appendChild(button);
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    generateCalendar(currentMonth, currentYear);
}

function prevMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    generateCalendar(currentMonth, currentYear);
}

document.getElementById('nextMonth').addEventListener('click', nextMonth);
document.getElementById('prevMonth').addEventListener('click', prevMonth);

document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const eventData = {
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        date: document.getElementById('eventDate').value
    };
    console.log('Enviando dados para o servidor:', eventData);
    // Aqui você pode adicionar o código para enviar os dados para o JSON server usando fetch ou XMLHttpRequest
});

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(currentMonth, currentYear);
});