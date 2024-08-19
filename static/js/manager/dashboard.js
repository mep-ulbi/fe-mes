import { UrlUsers, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateUI();
});

function fetchDataAndUpdateUI() {
    fetch(UrlUsers, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            updateCounts(data.data);
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function updateCounts(users) {
    let countEngineering = 0;
    let countOperation = 0;
    let countPPIC = 0;

    users.forEach(user => {
        if (user.role && user.role.name) {
            switch (user.role.name) {
                case 'Production Engineering':
                    countEngineering++;
                    break;
                case 'Production Operation':
                    countOperation++;
                    break;
                case 'PPIC':
                    countPPIC++;
                    break;
            }
        }
    });

    // Update HTML
    document.querySelector('.user-engineering-mobile').textContent = `${countEngineering} User`;
    document.querySelector('.user-engineering-desktop').textContent = `${countEngineering} User`;
    document.querySelector('.user-operation-mobile').textContent = `${countOperation} User`;
    document.querySelector('.user-operation-desktop').textContent = `${countOperation} User`;
    document.querySelector('.user-ppic-mobile').textContent = `${countPPIC} User`;
    document.querySelector('.user-ppic-desktop').textContent = `${countPPIC} User`;
}
