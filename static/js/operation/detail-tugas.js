import { UrlProductions, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    const stepId = getStepIdFromURL();
    fetchProductionStep(productionId, stepId);

    function fetchProductionStep(productionId, stepId) {
        fetch(`${UrlProductions}/${productionId}/steps/${stepId}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                populateForm(data.data);
            })
            .catch(error => console.error('Error fetching production step:', error));
    }

    function populateForm(stepData) {
        document.getElementById('kode_produk').value = stepData.kode_produk;
        document.getElementById('nama_produk').value = stepData.nama_produk;
        document.getElementById('step_name').value = stepData.step_name;
        document.getElementById('department').value = stepData.department;
        document.getElementById('description').value = stepData.description;
    }


    function endProductionStep(productionId, stepId) {
        const apiUrl = replacePlaceholders(UrlEndProductionStep, productionId, stepId);
        const data = {
            description: document.getElementById('description').value.trim()
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Success!',
                text: 'Production step ended successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch(error => {
            console.error('Error ending production step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to end production step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }
    function getProductionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productionId');
    }

    function getStepIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('stepId');
    }
});
