import { UrlProductions, requestOptionsGet, requestOptionsDelete } from "../controller/template.js";

// Fetch Data User
document.addEventListener('DOMContentLoaded', function() {
    fetch(UrlProductions, requestOptionsGet)
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error('Error fetching data:', error));

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((production, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${index + 1}</th>
                <td class="fw-bolder text-gray-500">${production.kode_produk}</td>
                <td class="fw-bolder text-gray-500">${production.nama_produk}</td>
                
                <td>
                    <button class="btn btn-sm btn-info" data-production="${production.id}">Detail</button>
                    <button class="btn btn-sm btn-warning" data-production="${production.id}">Edit</button>
                    <button class="btn btn-sm btn-danger" data-production="${production.id}">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        bindEventListeners();
    }

    function bindEventListeners() {
        // Event listener for detail buttons
        document.querySelectorAll('.btn-info').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-production');
                window.location.href = `detail-produksi.html?id=${id}`;
            });
        });
    
        // Event listener for edit buttons
        document.querySelectorAll('.btn-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-production');
                window.location.href = `update-produksi.html?id=${id}`;
            });
        });
    
        // Event listener for delete buttons
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-production');
                Swal.fire({
                    title: 'Hapus Data Produksi?',
                    text: "Data tidak akan dapat mengembalikan ini!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, Hapus!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteProduction(id);
                    }
                });
            });
        });
    }
});

// Function Delete User
function deleteProduction(id) {
    fetch(UrlProductions + `/${id}`, requestOptionsDelete)
        .then((response) => response.json())
        .then((data) => {
            // Display success SweetAlert
            Swal.fire({
                title: 'Deleted!',
                text: 'Data Produksi Berhasil Dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Reload the page after successful deletion
                location.reload();
            });
        })
        .catch((error) => {
            // Display error SweetAlert
			Swal.fire(
                'Error!',
                'Data Produksi Gagal Dihapus',
                'error'
                );
        })
}