import { UrlProductions, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    fetchProductionDetails(productionId);

    function fetchProductionDetails(id) {
        fetch(`${UrlProductions}/${id}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                displayProductionDetails(data);
            })
            .catch(error => console.error('Error fetching production details:', error));
    }

    function displayProductionDetails(data) {
        const titleElement = document.querySelector('h2.fs-5.fw-bold.mb-0');
        titleElement.textContent = `${data.kode_produk} - ${data.nama_produk}`;
    }

    function getProductionIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id') || 1; // Default to 1 if no id is in the URL
    }
});
