import { UrlProductionDetails, UrlBakuModule , requestOptionsGet,requestOptionsDelete } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const moduleId = getModuleIdFromURL();
    fetchModuleDetails(moduleId, 1);  

    function fetchModuleDetails(moduleId, page) {
        fetch(`${UrlBakuModule}${moduleId}?page=${page}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                updateTable(data.module, data.details_pagination.from);
                updatePagination(data.details_pagination, moduleId);
            })
            .catch(error => console.error('Error fetching module details:', error));
    }

    function updateTable(module, startRow) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        if (module && module.details && module.details.length > 0) {
            module.details.forEach((detail, index) => {
                const row = document.createElement('tr');
                row.style.textAlign = 'center';
                row.innerHTML = `
                    <th class="text-gray-900" scope="row">${startRow + index}</th>
                    <td class="fw-bolder text-gray-500">${module.nama_modul}</td>
                    <td class="fw-bolder text-gray-500">
                        <p>Nama Proses: ${detail.nama_proses}</p>
                        <p>Waktu (Menit): ${detail.waktu_m}</p>
                        <p>Output per Unit: ${detail.output_per_unit}</p>
                        <p>Jumlah Kebutuhan per Unit: ${detail.jumlah_kebutuhan_per_unit}</p>
                        <p>Waktu per Unit (Menit): ${detail.waktu_m_per_unit}</p>
                        <p>Tipe Proses: ${detail.process_type}</p>
                        <p>Utilisasi Mesin: ${detail.utilisasi_mesin}</p>
                    </td>

                `;
                tableBody.appendChild(row);
            });
            bindEventListeners();

        } else {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <td colspan="3" class="text-gray-500">No details available for this module.</td>
            `;
            tableBody.appendChild(row);
        }
    }

    function bindEventListeners() {
        document.querySelectorAll('.edit-process').forEach(button => {
            button.addEventListener('click', event => {
                const detailId = event.target.getAttribute('data-detail-id');
                window.location.href = `edit-detail-proses.html?id=${detailId}`;
            });
        });

        document.querySelectorAll('.delete-process').forEach(button => {
            button.addEventListener('click', event => {
                const detailId = event.target.getAttribute('data-detail-id');
                deleteProcessDetail(detailId);
            });
        });
    }

    function deleteProcessDetail(detailId) {
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Kamu Tidak Bisa Mengembalikan Ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus Data!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${UrlProductionDetails}/detail/${detailId}`, {
                    method: 'DELETE',
                    ...requestOptionsDelete
                })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        'Deleted!',
                        'Process detail has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.reload();

                        fetchModuleDetails(getModuleIdFromURL(), currentPage).then(() => {
                        }); // Refresh the table
                    });
                })
                .catch(error => {
                    console.error('Error deleting process detail:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete process detail.',
                        'error'
                    );
                });
            }
        });
    }

    function updatePagination(pagination, moduleId) {
        const paginationElement = document.getElementById('pagination');
        paginationElement.innerHTML = '';

        if (pagination.prev_page_url) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('btn', 'btn-secondary');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => {
                fetchModuleDetails(moduleId, pagination.current_page - 1);
            });
            paginationElement.appendChild(prevButton);
        }

        if (pagination.next_page_url) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-secondary');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                fetchModuleDetails(moduleId, pagination.current_page + 1);
            });
            paginationElement.appendChild(nextButton);
        }
    }

    function getModuleIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('module_id'); // Assuming 'module_id' is the query parameter for module_id
    }
});
