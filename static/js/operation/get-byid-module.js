import { UrlBakuModule, requestOptionsGet, requestOptionsPut } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const moduleId = getModuleIdFromURL();
    fetchModuleDetails(moduleId);

    const submitButton = document.getElementById('tambahButton');
    submitButton.addEventListener('click', function() {
        updateModule(moduleId);
    });

    function fetchModuleDetails(moduleId) {
        fetch(`${UrlBakuModule}${moduleId}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                populateForm(data.module);
            })
            .catch(error => console.error('Error fetching module details:', error));
    }

    function populateForm(module) {
        const namaModulInput = document.getElementById('module');
        const faktorXInput = document.getElementById('faktor_x');
        if (module && namaModulInput) {
            namaModulInput.value = module.nama_modul;
            faktorXInput.value = module.faktor_x;
        }
    }

    function updateModule(moduleId) {
        const namaModulInput = document.getElementById('module').value.trim();
        const faktorXInput = document.getElementById('faktor_x').value.trim();

        if (namaModulInput) {
            const data = {
                nama_modul: namaModulInput,
                faktor_x:  faktorXInput || 1
            };

            fetch(`${UrlBakuModule}${moduleId}`, {
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
                    text: 'Module updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.history.back(); 
                });
            })
            .catch(error => {
                console.error('Error updating module:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update module.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Module name cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    function getModuleIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
});
