import { UrlMachines, requestOptionsGet } from "../controller/template.js";

let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const machineId = urlParams.get('id');

    fetchData(machineId, currentPage);

    function fetchData(machineId, page) {
        fetch(`${UrlMachines}/steps/${machineId}?page=${page}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                updateTable(data);
                updatePagination(data, machineId);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((step, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';

            let actionButton = '';
            if (!step.start_time) {
                actionButton = `<button class="btn btn-sm btn-success TambahTugas" data-machine="${step.machineId}" data-steps="${step.id}">Tambah Tugas</button>`;
            } else if (step.start_time && !step.end_time) {
                actionButton = `<button class="btn btn-sm btn-primary LanjutkanTugas" data-machine="${step.machineId}" data-steps="${step.id}">Lanjutkan Tugas</button>`;
            }

            row.innerHTML = `
                <th class="text-gray-900" scope="row">${data.from + index}</th>
                <td class="fw-bolder text-gray-500">${step.step_name}</td>
                <td class="fw-bolder text-gray-500">${step.department}</td>
                <td class="fw-bolder text-gray-500">${step.lead_time ? step.lead_time : '-'}</td>
                <td class="fw-bolder text-gray-500">${step.description ? step.description : '-'}</td>
                <td class="fw-bolder text-gray-500">${step.start_time ? new Date(step.start_time).toLocaleString() : '-'}</td>
                <td class="fw-bolder text-gray-500">${step.end_time ? new Date(step.end_time).toLocaleString() : '-'}</td>
                <td class="fw-bolder text-gray-500">${step.hold_time ? new Date(step.hold_time).toLocaleString() : '-'}</td>
                <td class="fw-bolder text-gray-500">${step.resume_time ? new Date(step.resume_time).toLocaleString() : '-'}</td>
            `;
            tableBody.appendChild(row);
        });

        // Event listeners for dynamically created buttons
        document.querySelectorAll('.TambahTugas').forEach(button => {
            button.addEventListener('click', event => {
                const machineId = event.target.getAttribute('data-machine');
                const stepId = event.target.getAttribute('data-steps');
                window.location.href = `tambah-tugas-mesin.html?machineId=${machineId}&stepId=${stepId}`;
            });
        });

        document.querySelectorAll('.LanjutkanTugas').forEach(button => {
            button.addEventListener('click', event => {
                const machineId = event.target.getAttribute('data-machine');
                const stepId = event.target.getAttribute('data-steps');
                window.location.href = `lanjutkan-tugas-mesin.html?machineId=${machineId}&stepId=${stepId}`;
            });
        });
    }

    function updatePagination(data, machineId) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (data.prev_page_url) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('btn', 'btn-secondary', 'me-2');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => {
                currentPage--;
                fetchData(machineId, currentPage);
            });
            pagination.appendChild(prevButton);
        }

        if (data.next_page_url) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-secondary');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                currentPage++;
                fetchData(machineId, currentPage);
            });
            pagination.appendChild(nextButton);
        }
    }
});
