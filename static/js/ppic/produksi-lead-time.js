import { token } from "../controller/cookies,js";
document.addEventListener('DOMContentLoaded', function() {
    fetchAllData();

    function fetchAllData() {
        const token = getCookie('login');

        fetch('http://localhost:5000/api/productions-summary', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer  ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            populateTable(data);
            setupPagination(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function populateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        if (data.data && data.data.length > 0) {
            data.data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.style.textAlign = 'center';
                row.innerHTML = `
                    <th class="text-gray-900" scope="row">${data.from + index}</th>
                    <td class="fw-bolder text-gray-500">${item.kode_produk}</td>
                    <td class="fw-bolder text-gray-500">${item.nama_produk || '-'}</td>
                    <td class="fw-bolder text-gray-500"><a href="${item.dok_production_lead_time}" target="_blank">Download File</a></td>
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
        } else {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <td colspan="6" class="text-gray-500">No data available.</td>
            `;
            tableBody.appendChild(row);
        }
    }

    function setupPagination(data) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (data.links && data.links.length > 0) {
            data.links.forEach(link => {
                const pageButton = document.createElement('button');
                pageButton.classList.add('btn', link.active ? 'btn-primary' : 'btn-secondary');
                pageButton.textContent = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                pageButton.disabled = !link.url;

                if (link.url) {
                    pageButton.addEventListener('click', () => {
                        fetchPage(link.url);
                    });
                }

                pagination.appendChild(pageButton);
            });
        }
    }

    function fetchPage(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN_HERE',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            populateTable(data);
            setupPagination(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
});
