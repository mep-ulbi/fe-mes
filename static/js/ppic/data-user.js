import { UrlUsers, requestOptionsGet, requestOptionsDelete } from "../controller/template.js";

// Fetch Data User
document.addEventListener('DOMContentLoaded', function() {
    fetch(UrlUsers, requestOptionsGet)
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
            `;
            tableBody.appendChild(row);
        });

        bindEventListeners();
    }

    function bindEventListeners() {
        // Event listener for detail buttons
        document.querySelectorAll('.btn-info').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-user');
                window.location.href = `detail-user.html?id=${id}`;
            });
        });
    
        // Event listener for edit buttons
        document.querySelectorAll('.btn-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-user');
                window.location.href = `update-user.html?id=${id}`;
            });
        });
    
        // Event listener for delete buttons
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-user');
                Swal.fire({
                    title: 'Hapus Data User?',
                    text: "Data tidak akan dapat mengembalikan ini!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya, Hapus!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteUser(id);
                    }
                });
            });
        });
    }
});

// Function Delete User
function deleteUser(id) {
    fetch(UrlUsers + `/${id}`, requestOptionsDelete)
        .then((response) => response.json())
        .then((data) => {
            // Display success SweetAlert
            Swal.fire({
                title: 'Deleted!',
                text: 'Data User Berhasil Dihapus.',
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
                'Data User Gagal Dihapus',
                'error'
                );
        })
}
