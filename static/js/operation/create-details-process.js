import { UrlProductionDetails, requestOptionsPost } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const moduleId = getModuleIdFromURL();
    const productionId = getProductionIdFromURL();

    const tambahButton = document.getElementById('tambahButton');
    tambahButton.addEventListener('click', function() {
        const namaProses = document.getElementById('nama_proses').value.trim();
        const waktuM = document.getElementById('waktu_m').value.trim();
        const outputPerUnit = document.getElementById('output_per_unit').value.trim();
        const jumlahKebutuhanPerUnit = document.getElementById('jumlah_kebutuhan_per_unit').value.trim();
        const processType = document.getElementById('process_type').value;
        const utilisasiMesin = document.getElementById('utilisasi_mesin').value;

        if (namaProses && waktuM && outputPerUnit && jumlahKebutuhanPerUnit && processType && utilisasiMesin) {
            postProcessDetail(productionId,moduleId, namaProses, waktuM, outputPerUnit, jumlahKebutuhanPerUnit, processType, utilisasiMesin);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Semua field harus diisi',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function postProcessDetail(productionId, moduleId, namaProses, waktuM, outputPerUnit, jumlahKebutuhanPerUnit, processType, utilisasiMesin) {
        const data = {
            productionId: parseInt(productionId),
            module_id: parseInt(moduleId),
            nama_proses: namaProses,
            waktu_m: parseInt(waktuM),
            output_per_unit: parseInt(outputPerUnit),
            jumlah_kebutuhan_per_unit: parseInt(jumlahKebutuhanPerUnit),
            process_type: processType,
            utilisasi_mesin: utilisasiMesin
        };
        fetch(`${UrlProductionDetails}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...requestOptionsPost
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Success!',
                text: 'Detail proses berhasil ditambahkan',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.history.back(); // Redirect back to the previous page
            });
        })
        .catch(error => {
            console.error('Error posting data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Gagal menambahkan detail proses',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function getModuleIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('module_id');
    }
    function getProductionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productionId');
    }
});
