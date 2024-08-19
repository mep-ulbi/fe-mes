import { UrlUsers, requestOptionsGet } from "../controller/template.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch Data User Get By Id
fetch(UrlUsers + `/${id}`, requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((values) => {
		if (values && values.data) {
			document.getElementById("name").value = values.data.name;
			document.getElementById("email").value = values.data.email;
			document.getElementById("role_id").value = values.data.role.name;
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
    window.location.href = `update-user.html?id=${id}`;
})