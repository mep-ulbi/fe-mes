import { UrlOperations, requestOptionsPut } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    const stepId = getStepIdFromURL();
    document.getElementById('holdButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            holdProductionStep(productionId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    document.getElementById('continueButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            continueProductionStep(productionId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
    

    document.getElementById('endButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            endProductionStep(productionId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function holdProductionStep(productionId, stepId, description) {
        const data = { description };

        fetch(`${UrlOperations}/productions/${productionId}/steps/${stepId}/hold`, {
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
                text: 'Production step put on hold successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
            window.location.href = `tahapan-produksi.html?id=${productionId}`; // Go back to the previous page after updating
 });
        })
        .catch(error => {
            console.error('Error putting production step on hold:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to put production step on hold.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    
    function continueProductionStep(productionId, stepId, description) {
        const data = { description };

        fetch(`${UrlOperations}/productions/${productionId}/steps/${stepId}/continue`, {
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
                text: 'Production step continued successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-produksi.html?id=${productionId}`; // Go back to the previous page after updating
            });
        })
        .catch(error => {
            console.error('Error continuing production step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to continue production step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }
    
    function endProductionStep(productionId, stepId, description) {
        const data = { description };

        fetch(`${UrlOperations}/productions/${productionId}/steps/${stepId}/end`, {
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
                text: 'Production step ended successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-produksi.html?id=${productionId}`; // Go back to the previous page after updating
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
