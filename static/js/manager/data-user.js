import { UrlGetAllUser, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

document.addEventListener('DOMContentLoaded', function() {

    fetch(UrlGetAllUser, requestOptionsGet)
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error('Error fetching data:', error));

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((user, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${index + 1}</th>
                <td class="fw-bolder text-gray-500">${user.name}</td>
                <td class="fw-bolder text-gray-500">**********</td> <!-- Sengaja tidak menampilkan password -->
                <td class="fw-bolder text-gray-500">${user.email}</td>
                <td class="fw-bolder text-gray-500">${user.role.name}</td>
                <td>
                    <a href="#" class="btn btn-sm btn-info">Detail</a>
                    <a href="#" class="btn btn-sm btn-warning">Edit</a>
                    <a href="#" class="btn btn-sm btn-danger">Hapus</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
});
