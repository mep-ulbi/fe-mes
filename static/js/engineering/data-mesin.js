import { UrlMachines, requestOptionsGet, requestOptionsDelete } from "../controller/template.js";

// Fetch Data User
document.addEventListener('DOMContentLoaded', function() {
    fetch(UrlMachines, requestOptionsGet)
        .then(response => response.json())
        .then(data => updateTable(data))
        .catch(error => console.error('Error fetching data:', error));

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((machine, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${index + 1}</th>
                <td class="fw-bolder text-gray-500">${machine.kode_mesin}</td>
                <td class="fw-bolder text-gray-500">${machine.nama_mesin}</td>
                <td>
                    <button class="btn btn-sm btn-info" data-machine="${machine.id}">Detail</button>
                    <button class="btn btn-sm btn-warning" data-machine="${machine.id}">Edit</button>
                    <button class="btn btn-sm btn-danger" data-machine="${machine.id}">Hapus</button>
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
                const id = event.target.getAttribute('data-machine');
                window.location.href = `detail-mesin.html?id=${id}`;
            });
        });
    
        // Event listener for edit buttons
        document.querySelectorAll('.btn-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-machine');
                window.location.href = `update-mesin.html?id=${id}`;
            });
        });
    
        // Event listener for delete buttons
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-machine');
                Swal.fire({
                    title: 'Hapus Data Mesin?',
                    text: "Data tidak akan dapat mengembalikan ini!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, Hapus!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteMachine(id);
                    }
                });
            });
        });
    }
});

// Function Delete User
function deleteMachine(id) {
    fetch(UrlMachines + `/${id}`, requestOptionsDelete)
        .then((response) => response.json())
        .then((data) => {
            // Display success SweetAlert
            Swal.fire({
                title: 'Deleted!',
                text: 'Data Mesin Berhasil Dihapus.',
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
                'Data Mesin Gagal Dihapus',
                'error'
                );
        })
}