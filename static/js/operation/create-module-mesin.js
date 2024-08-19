import { UrlBakuModuleMachine, requestOptionsPost } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const machineId = getMachineIdFromURL();

    const tambahButton = document.getElementById('tambahButton');
    tambahButton.addEventListener('click', function() {
        const moduleName = document.getElementById('module').value.trim();
        const faktor_x = document.getElementById('faktor_x').value.trim();
        if (moduleName) {
            postModuleData(machineId, moduleName, faktor_x);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Nama Mesin / Modul / Proses tidak boleh kosong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function postModuleData(machineId, moduleName,faktor_x) {
        const data = {
            machineId: machineId,
            nama_modul: moduleName,
            faktor_x: faktor_x || 1
        };

        fetch(`${UrlBakuModuleMachine}`, {
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
                text: 'Modul berhasil ditambahkan',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
history.back();
            });
        })
        .catch(error => {
            console.error('Error posting data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Gagal menambahkan modul',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function getMachineIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('machineId');
    }
});
