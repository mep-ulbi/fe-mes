import { UrlMachines, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let machineData;

// Fetch Data User Get By Id
fetch(UrlMachines + `/${id}`, requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((values) => {
		if (values) {
            machineData = values;
			document.getElementById("kode_mesin").value = values.kode_mesin;
			document.getElementById("nama_mesin").value = values.nama_mesin;
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
	const kode_mesin = document.getElementById('kode_mesin').value;
	const nama_mesin = document.getElementById('nama_mesin').value;

	const updatedData = {
		kode_mesin: kode_mesin,
		nama_mesin: nama_mesin
	};
    
	if (isDataChanged(machineData, updatedData)) {
		showConfirmationAlert(updatedData);
	} else {
		showNoChangeAlert();
	}
});

// Fungsi untuk membandingkan apakah ada perubahan pada data
function isDataChanged(existingData, newData) {
	return (
		existingData.kode_mesin !== newData.kode_mesin ||
		existingData.nama_mesin !== newData.nama_mesin
	);
}

// Fungsi untuk menampilkan alert konfirmasi perubahan data
function showConfirmationAlert(data) {
	Swal.fire({
		title: 'Perubahan Data Mesin',
		text: "Apakah anda yakin ingin melakukan perubahan?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			updateMachine(data);
		} else {
			// Menampilkan Data Alert Error
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Data Mesin Gagal Diperbarui!',
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
function updateMachine(data) {
    fetch(UrlMachines + `/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal memperbarui data Mesin');
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
            text: 'Data Mesin Berhasil Diperbarui',
            showConfirmButton: false,
            timer: 1500
        });
        // Redirect to another page if needed
        window.location.href = 'data-mesin.html';
    })
    .catch(error => {
        console.error("Error saat melakukan PUT data:", error);
        // Handle specific error message
        if (error.message === 'Gagal memperbarui data Mesin') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data Mesin!',
            });
        } else {
            // Handle other errors
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data Mesin!',
            });
        }
    });
}