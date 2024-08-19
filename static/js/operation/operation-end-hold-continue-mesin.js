import { UrlMachines, requestOptionsPut } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const machineId = getMachineIdFromURL();
    const stepId = getStepIdFromURL();
    document.getElementById('holdButton').addEventListener('click', function() {
        const description = document.getElementById('description').value.trim();
        if (description) {
            holdMachineStep(machineId, stepId, description);
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
            continueMachineStep(machineId, stepId, description);
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
            endMachineStep(machineId, stepId, description);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Description cannot be empty.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function holdMachineStep(machineId, stepId, description) {
        const data = { description };

        fetch(`${UrlMachines}/${machineId}/steps/${stepId}/hold`, {
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
                text: 'Machine step put on hold successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-mesin.html?id=${machineId}`;
            });
        })
        .catch(error => {
            console.error('Error putting machine step on hold:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to put machine step on hold.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    
    function continueMachineStep(machineId, stepId, description) {
        const data = { description };

        fetch(`${UrlMachines}/${machineId}/steps/${stepId}/continue`, {
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
                text: 'Machine step continued successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-mesin.html?id=${machineId}`;
            });
        })
        .catch(error => {
            console.error('Error continuing machine step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to continue machine step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }
    
    function endMachineStep(machineId, stepId, description) {
        const data = { description };

        fetch(`${UrlMachines}/${machineId}/steps/${stepId}/end`, {
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
                text: 'Machine step ended successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = `tahapan-mesin.html?id=${machineId}`;
            });
        })
        .catch(error => {
            console.error('Error ending machine step:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to end machine step.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

    function getMachineIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('machineId'); 
    }

    function getStepIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('stepId'); 
    }
});
