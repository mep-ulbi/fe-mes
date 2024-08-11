import { UrlProductions, requestOptionsGet } from "../controller/template.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch Data User Get By Id
fetch(UrlProductions + `/${id}`, requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((values) => {
		if (values) {
			document.getElementById("kode_produk").value = values.kode_produk;
			document.getElementById("nama_produk").value = values.nama_produk;
			document.getElementById("tahapan_proses").value = values.tahapan_proses;
			document.getElementById("nama_proses_modul").value = values.nama_proses_modul;
            document.getElementById("detail_proses").value = values.detail_proses;
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
    window.location.href = `update-produksi.html?id=${id}`;
})