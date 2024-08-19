import { UrlMachines, requestOptionsPut } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const machineId = getMachineIdFromURL();
    const stepId = getStepIdFromURL();
    
    document.getElementById('startButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            startMachineStep(machineId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });


    function startMachineStep(machineId, stepId, description) {
        const data = { description };

        fetch(`${UrlMachines}/${machineId}/steps/${stepId}/start`, {
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
                text: 'Machine step started successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-mesin.html?id=${machineId}`; 
            });
        })
        .catch(error => {
            console.error('Error starting machine step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to start machine step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function getMachineIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('machineId'); // Assuming 'machineId' is the query parameter for production ID
    }

    function getStepIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('stepId'); // Assuming 'stepId' is the query parameter for step ID
    }
});
