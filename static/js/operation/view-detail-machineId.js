import { UrlMachines, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const machineId = getMachineIdFromURL();
    fetchMachineDetails(machineId);

    function fetchMachineDetails(id) {
        fetch(`${UrlMachines}/${id}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                displayMachineDetails(data);
            })
            .catch(error => console.error('Error fetching machine details:', error));
    }

    function displayMachineDetails(data) {
        const titleElement = document.querySelector('h2.fs-5.fw-bold.mb-0');
        titleElement.textContent = `${data.kode_mesin} - ${data.nama_mesin}`;
    }

    function getMachineIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('machineId') ; // Default to 1 if no id is in the URL
    }
});
