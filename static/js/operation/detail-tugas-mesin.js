import { UrlMachines, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const machineId = getMachineIdFromURL();
    const stepId = getStepIdFromURL();
    fetchMachineStep(machineId, stepId);

    function fetchMachineStep(machineId, stepId) {
        fetch(`${UrlMachines}/${machineId}/steps/${stepId}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                populateForm(data.data);
            })
            .catch(error => console.error('Error fetching machine step:', error));
    }

    function populateForm(stepData) {
        document.getElementById('kode_mesin').value = stepData.kode_mesin;
        document.getElementById('nama_mesin').value = stepData.nama_mesin;
        document.getElementById('step_name').value = stepData.step_name;
        document.getElementById('department').value = stepData.department;
        document.getElementById('description').value = stepData.description;
    }


    function endMachineStep(machineId, stepId) {
        const apiUrl = replacePlaceholders(UrlEndMachineStep, machineId, stepId);
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
                text: 'Machine step ended successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
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
