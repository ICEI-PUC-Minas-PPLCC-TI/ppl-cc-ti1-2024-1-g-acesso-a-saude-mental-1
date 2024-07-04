let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let day;
let mes;
let appointments;

async function loadAppointments() {
    const response = await fetch("http://localhost:3000/horarios");
    const data = await response.json();
    appointments = data;
}

const horarios = document.getElementById("horarios");

function generateCalendar(month, year) {
    mes = month;
    const monthYearElement = document.getElementById('monthYear');
    monthYearElement.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let date = 1;
    let nextDate = 1;
    let hasCurrentMonthDays = false;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        hasCurrentMonthDays = false; // Reset for each row

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                const prevMonthDate = daysInPrevMonth - firstDay + j + 1;
                const button = document.createElement('button');
                button.innerText = prevMonthDate;
                button.classList.add('prev-month');
                button.disabled = true; // Optional: Disable buttons for previous month
                cell.appendChild(button);
            } else if (date > daysInMonth) {
                const button = document.createElement('button');
                button.innerText = nextDate;
                button.classList.add('next-month');
                button.disabled = true; // Optional: Disable buttons for next month
                cell.appendChild(button);
                nextDate++;
            } else {
                const button = document.createElement('button');
                button.innerText = date;
                button.addEventListener('click', () => {
                    horarios.innerHTML = "";
                    const selectedButton = document.querySelector('.selected');
                    if (selectedButton) {
                        selectedButton.classList.remove('selected');
                    }
                    button.classList.add('selected');
                    const formContainer = document.getElementById('formContainer');
                    formContainer.style.display = 'block';
                    const hours = appointments.filter(hour => {
                        return hour.data === +button.textContent && hour.mes === month + 1;
                    });
                    console.log(hours);
                    hours.forEach(appointment => {
                        horarios.innerHTML += `
                            <p>
                                <a href="/codigo/pages/home-paciente/telaDePagamento.html">${appointment.hora}</a>
                            </p>
                        `;
                    });
                    day = +button.textContent;
                });
                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    button.classList.add('today');
                }
                cell.appendChild(button);
                date++;
                hasCurrentMonthDays = true; // Set to true when there's a day from the current month
            }
            row.appendChild(cell);
        }
        // Only append the row if it contains at least one current month day
        if (hasCurrentMonthDays) {
            calendarBody.appendChild(row);
        }
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


document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    generateCalendar(currentMonth, currentYear);
});
