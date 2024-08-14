import { UrlProductions, requestOptionsGet, requestOptionsDelete } from "../controller/template.js";

let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    fetchData(currentPage);

    function fetchData(page) {
        fetch(`${UrlProductions}?page=${page}`, requestOptionsGet)
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

        data.data.forEach((production, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${data.from + index}</th>
                <td class="fw-bolder text-gray-500">${production.kode_produk}</td>
                <td class="fw-bolder text-gray-500">${production.nama_produk}</td>
                <td class="fw-bolder text-gray-500"><a href="${production.filePath}" target="_blank"><button class="btn btn-outline-info" >Download </button></a></td>
                <td class="fw-bolder text-gray-500"><button class="btn btn-outline-success" data-production="${production.id}" >CEK DATA</button></td>
                <td class="fw-bolder text-gray-500"><button class="btn btn-outline-warning" data-production="${production.id}">CEK DATA</button></td>
                <td class="fw-bolder text-gray-500"><button class="btn btn-outline-primary" data-production="${production.id}">CEK DATA</button></td>
                
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
                const id = event.target.getAttribute('data-production');
                window.location.href = `detail-produksi.html?id=${id}`;
            });
        });
    
        // Event listener for edit buttons
        document.querySelectorAll('.btn-outline-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-production');
                window.location.href = `tahapan-proses.html?id=${id}`;
            });
        });
    
        document.querySelectorAll('.btn-outline-primary').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-production');
                window.location.href = `update-produksi.html?id=${id}`;
            });
        });
    
        // Event listener for delete buttons
        
    }
});

// Function to delete a production
function deleteProduction(id) {
    fetch(UrlProductions + `/${id}`, requestOptionsDelete)
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Deleted!',
                text: 'Data Produksi Berhasil Dihapus.',
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
                'Data Produksi Gagal Dihapus',
                'error'
            );
        });
}
