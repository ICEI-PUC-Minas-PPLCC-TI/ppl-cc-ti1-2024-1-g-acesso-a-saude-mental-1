let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let day;
let mes;
let appointments;

async function loadAppointments() {
    const response = await fetch("https://778b3d17-899f-478a-bc1a-fb48f02dff8b-00-10mayq3qxg10t.kirk.replit.dev/horarios")
    const data = await response.json()
    appointments = data
}

const horarios = document.getElementById("horarios")

function generateCalendar(month, year) {
    mes = month;
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
                    horarios.innerHTML = ""
                    const selectedButton = document.querySelector('.selected');
                    if (selectedButton) {
                        selectedButton.classList.remove('selected');
                    }
                    button.classList.add('selected');
                    const formContainer = document.getElementById('formContainer');
                    formContainer.style.display = 'block';
                    const hours = appointments.filter(hour => {
                        return hour.data === +button.textContent && hour.mes === month + 1
                    })
                    console.log(hours);
                    hours.forEach(appointment => {
                        horarios.innerHTML += `
                            <p>${appointment.hora}</p>
                        `
                    })
                    day = +button.textContent
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
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    generateCalendar(currentMonth, currentYear);
}

function prevMonth() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    generateCalendar(currentMonth, currentYear);
}

document.getElementById('nextMonth').addEventListener('click', nextMonth);
document.getElementById('prevMonth').addEventListener('click', prevMonth);

document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const eventData = {
        hora: document.getElementById('eventTitle').value,
        data: +day,
        mes: mes + 1
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    };

    // Enviando a requisição para o servidor
    fetch('https://778b3d17-899f-478a-bc1a-fb48f02dff8b-00-10mayq3qxg10t.kirk.replit.dev/horarios', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados para o servidor');
            }
            loadAppointments();
        })
        .then(data => {
            horarios.innerHTML += `
                <p>${document.getElementById('eventTitle').value}</p>
            `
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    loadAppointments()
    generateCalendar(currentMonth, currentYear);
});