import { UrlMachines, requestOptionsGet } from "../controller/template.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch Data User Get By Id
fetch(UrlMachines + `/${id}`, requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((values) => {
		if (values) {
			document.getElementById("kode_mesin").value = values.kode_mesin;
			document.getElementById("nama_mesin").value = values.nama_mesin;
		} else {
			console.log("Data tidak ditemukan");
		}
	})
	.catch(error => {
		console.log('error', error);
});

// Event listener untuk tombol Edit
const editButton = document.querySelector('#editButton');
editButton.addEventListener('click', (event) => {
    window.location.href = `update-mesin.html?id=${id}`;
})