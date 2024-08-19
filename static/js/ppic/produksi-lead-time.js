import { UrlSumProduksi, requestOptionsGet } from "../controller/template.js";

let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    fetchData(currentPage);

    function fetchData(page) {
        fetch(`${UrlSumProduksi}?page=${page}`, requestOptionsGet)
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

        data.data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${data.from + index}</th>
                <td class="fw-bolder text-gray-500">${item.kode_produk}</td>
                <td class="fw-bolder text-gray-500">${item.nama_produk}</td>
                <td class="fw-bolder text-gray-500">
                    <p>Assy MH: ${item.assy_mh}</p>
                    <p>Assy MCH: ${item.assy_mch}</p>
                    <p>Testing MH: ${item.testing_mh}</p>
                    <p>Testing MCH: ${item.testing_mch}</p>
                </td>
                <td class="fw-bolder text-gray-500">${item.total_lead_time}</td>
                
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
});