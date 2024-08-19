import { UrlOperations, requestOptionsPut } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    const stepId = getStepIdFromURL();
    
    document.getElementById('startButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            startProductionStep(productionId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });


    function startProductionStep(productionId, stepId, description) {
        const data = { description };

        fetch(`${UrlOperations}/productions/${productionId}/steps/${stepId}/start`, {
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
                text: 'Production step started successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-produksi.html?id=${productionId}`; // Go back to the previous page after updating
            });
        })
        .catch(error => {
            console.error('Error starting production step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to start production step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function getProductionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('productionId'); // Assuming 'productionId' is the query parameter for production ID
    }

    function getStepIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('stepId'); // Assuming 'stepId' is the query parameter for step ID
    }
});
