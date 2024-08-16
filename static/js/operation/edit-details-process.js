import { UrlProductionDetails, requestOptionsGet, requestOptionsPut, requestOptionsDelete } from "../controller/template.js";

function getDetailIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
document.addEventListener('DOMContentLoaded', function() {
    const detailId = getDetailIdFromURL();
    fetchProcessDetailById(detailId);

    function fetchProcessDetailById(detailId) {
        fetch(`${UrlProductionDetails}/detail/${detailId}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                populateForm(data);
            })
            .catch(error => console.error('Error fetching process detail:', error));
    }

    function populateForm(detail) {
        document.getElementById('nama_proses').value = detail.nama_proses;
        document.getElementById('waktu_m').value = detail.waktu_m;
        document.getElementById('output_per_unit').value = detail.output_per_unit;
        document.getElementById('jumlah_kebutuhan_per_unit').value = detail.jumlah_kebutuhan_per_unit;
        document.getElementById('process_type').value = detail.process_type;
        document.getElementById('utilisasi_mesin').value = detail.utilisasi_mesin;
    }

    function getDetailIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); 
    }
    
});
document.getElementById('updateButton').addEventListener('click', function() {
    const detailId = getDetailIdFromURL();
    Swal.fire({
        title: 'Anda Yakin Ingin Merubah?',
        text: "Kamu Tidak Bisa Mengembalikan Ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus Data!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            updateProcessDetail(detailId); 
        }
    });

    function updateProcessDetail(detailId) {
        const data = {
            nama_proses: document.getElementById('nama_proses').value.trim(),
            waktu_m: parseInt(document.getElementById('waktu_m').value, 10),
            output_per_unit: parseInt(document.getElementById('output_per_unit').value, 10),
            jumlah_kebutuhan_per_unit: parseInt(document.getElementById('jumlah_kebutuhan_per_unit').value, 10),
            process_type: document.getElementById('process_type').value,
            utilisasi_mesin: document.getElementById('utilisasi_mesin').value
        };

        fetch(`${UrlProductionDetails}/detail/${detailId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...requestOptionsPut
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Success!',
                text: 'Process detail updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.history.back(); 
            });
        })
        .catch(error => {
            console.error('Error updating process detail:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update process detail.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }
});