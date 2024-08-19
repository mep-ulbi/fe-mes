import { UrlMachines, UrlProductions, requestOptionsGet } from "../controller/template.js";

// Fetch Data Jumlah Produksi dan Mesin
document.addEventListener('DOMContentLoaded', function() {
    fetch(UrlProductions, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            totalProduction(data.total);
        })
        .catch(error => console.error('Error fetching data:', error));
    
    fetch(UrlMachines, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            totalMachine(data.total);
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to update total production count in the HTML
function totalProduction(totalCount) {
    const totalProductionMobile = document.getElementById('totalProductionMobile');
    const totalProductionDesktop = document.getElementById('totalProductionDesktop')
    totalProductionMobile.innerHTML = `${totalCount} Produk` || 0    ;
    totalProductionDesktop.innerHTML = `${totalCount} Produk` || 0;
}

// Function to update total production count in the HTML
function totalMachine(totalCount) {
    const totalMachineMobile = document.getElementById('totalMachineMobile');
    const totalMachineDesktop = document.getElementById('totalMachineDesktop');
    totalMachineMobile.innerHTML = `${totalCount} Mesin` || 0;
    totalMachineDesktop.innerHTML = `${totalCount} Mesin` || 0;
}