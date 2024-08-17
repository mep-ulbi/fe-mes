document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    const stepId = getStepIdFromURL();

    document.getElementById('mulaiButton').addEventListener('click', function() {
        startProductionStep(productionId, stepId);
    });

    document.getElementById('berhentiButton').addEventListener('click', function() {
        endProductionStep(productionId, stepId);
    });

    function startProductionStep(productionId, stepId) {
        const apiUrl = replacePlaceholders(UrlStartProductionStep, productionId, stepId);
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
                text: 'Production step started successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
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
