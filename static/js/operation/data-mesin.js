import { UrlMachines, requestOptionsGet, requestOptionsDelete } from "../controller/template.js";

let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    fetchData(currentPage);

    function fetchData(page) {
        fetch(`${UrlMachines}?page=${page}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                updateTable(data);
                updatePagination(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((machines, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${data.from + index}</th>
                <td class="fw-bolder text-gray-500">${machines.kode_mesin}</td>
                <td class="fw-bolder text-gray-500">${machines.nama_mesin}</td>
                <td class="fw-bolder text-gray-500"><a href="${machines.filePath}" target="_blank"><button class="btn btn-outline-info" >Download </button></a></td>
                <td class="fw-bolder text-gray-500"><button class="btn btn-outline-warning" data-machines="${machines.id}">CEK DATA</button></td>
                <td class="fw-bolder text-gray-500"><button class="btn btn-outline-primary" data-machines="${machines.id}">CEK DATA</button></td>
                
            `;
            tableBody.appendChild(row);
        });

        bindEventListeners();
    }

    function updatePagination(data) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (data.prev_page_url) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('btn', 'btn-secondary');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => {
                currentPage--;
                fetchData(currentPage);
            });
            pagination.appendChild(prevButton);
        }

        if (data.next_page_url) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-secondary');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                currentPage++;
                fetchData(currentPage);
            });
            pagination.appendChild(nextButton);
        }
    }

    function bindEventListeners() {
        // Event listener for detail buttons
        document.querySelectorAll('.btn-outline-success').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-machines');
                window.location.href = `detail-mesin.html?id=${id}`;
            });
        });
    
        // Event listener for edit buttons
        document.querySelectorAll('.btn-outline-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-machines');
                window.location.href = `tahapan-mesin.html?id=${id}`;
            });
        });
    
        document.querySelectorAll('.btn-outline-primary').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-machines');
                window.location.href = `data-waktu-baku-mesin.html?id=${id}`;
            });
        });
    
        // Event listener for delete buttons
        
    }
});

// Function to delete a production
function deleteProduction(id) {
    fetch(UrlMachines + `/${id}`, requestOptionsDelete)
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Deleted!',
                text: 'Data Mesin Berhasil Dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                fetchData(currentPage); // Reload the data after deletion
            });
        })
        .catch(error => {
            Swal.fire(
                'Error!',
                'Data Mesin Gagal Dihapus',
                'error'
            );
        });
}
