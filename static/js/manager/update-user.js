import { UrlUsers, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let userData;

// Fetch Data User Get By Id
fetch(UrlUsers + `/${id}`, requestOptionsGet)
    .then((result) => {
        return result.json();
    })
    .then((values) => {
        if (values && values.data) {
            userData = values.data;
            document.getElementById("name").value = values.data.name;
            document.getElementById("email").value = values.data.email;
            document.getElementById("password").value = values.data.password;
            document.getElementById("role_id").value = values.data.role.name;
        } else {
            console.log("Data tidak ditemukan");
        }
    })
    .catch(error => {
        console.log('error', error);
    });

// Update Data User
// Event listener untuk tombol "Submit"
const submitButton = document.querySelector('#editButton');
submitButton.addEventListener('click', () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const role_id = document.getElementById('role_id').value;

	const updatedData = {
		name: name,
		email: email,
		password: password,
		role_id: role_id
	};
    
	if (isDataChanged(userData, updatedData)) {
		showConfirmationAlert(updatedData);
	} else {
		showNoChangeAlert();
	}
});

// Fungsi untuk membandingkan apakah ada perubahan pada data
function isDataChanged(existingData, newData) {
	return (
		existingData.name !== newData.name ||
		existingData.email !== newData.email ||
		existingData.password !== newData.password ||
		existingData.role_id !== newData.role_id
	);
}

// Fungsi untuk menampilkan alert konfirmasi perubahan data
function showConfirmationAlert(data) {
	Swal.fire({
		title: 'Perubahan Data User',
		text: "Apakah anda yakin ingin melakukan perubahan?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			updateUser(data);
		} else {
			// Menampilkan Data Alert Error
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Data User Gagal Diperbarui!',
			});
		}
	});
}
// Function untuk Alert Error
function showNoChangeAlert() {
	Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text : 'Tidak Ada Perubahan Data'
	});
}

// Function Fetch Endpoint Put
function updateUser(data) {
    fetch(UrlUsers + `/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal memperbarui data User');
        }
        return response.json();
    })
    .then(responseData => {
        // Handle successful response here
        console.log('Response:', responseData);
        // Menampilkan Data Alert Success
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Data User Berhasil Diperbarui',
            showConfirmButton: false,
            timer: 1500
        });
        // Redirect to another page if needed
        window.location.href = 'data-user.html';
    })
    .catch(error => {
        console.error("Error saat melakukan PUT data:", error);
        // Handle specific error message
        if (error.message === 'Gagal memperbarui data User') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data User!',
            });
        } else {
            // Handle other errors
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data User!',
            });
        }
    });
}