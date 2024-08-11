import { UrlProductions, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let productionData;

// Fetch Data User Get By Id
fetch(UrlProductions + `/${id}`, requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((values) => {
		if (values) {
            productionData = values;
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

// Update Data User
// Event listener untuk tombol "Submit"
const submitButton = document.querySelector('#editButton');
submitButton.addEventListener('click', () => {
	const kode_produk = document.getElementById('kode_produk').value;
	const nama_produk = document.getElementById('nama_produk').value;
	const nama_proses_modul = document.getElementById('nama_proses_modul').value;
	const detail_proses = document.getElementById('detail_proses').value;
    const tahapan_proses = document.getElementById('tahapan_proses').value;

	const updatedData = {
		kode_produk: kode_produk,
		nama_produk: nama_produk,
		nama_proses_modul: nama_proses_modul,
		detail_proses: detail_proses,
        tahapan_proses: tahapan_proses
	};
    
	if (isDataChanged(productionData, updatedData)) {
		showConfirmationAlert(updatedData);
	} else {
		showNoChangeAlert();
	}
});

// Fungsi untuk membandingkan apakah ada perubahan pada data
function isDataChanged(existingData, newData) {
	return (
		existingData.kode_produk !== newData.kode_produk ||
		existingData.nama_produk !== newData.nama_produk ||
		existingData.nama_proses_modul !== newData.nama_proses_modul ||
		existingData.detail_proses !== newData.detail_proses ||
        existingData.tahapan_proses !== newData.tahapan_proses
	);
}

// Fungsi untuk menampilkan alert konfirmasi perubahan data
function showConfirmationAlert(data) {
	Swal.fire({
		title: 'Perubahan Data Produksi',
		text: "Apakah anda yakin ingin melakukan perubahan?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			updateProduction(data);
		} else {
			// Menampilkan Data Alert Error
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Data Produksi Gagal Diperbarui!',
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
function updateProduction(data) {
    fetch(UrlProductions + `/${id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal memperbarui data Produksi');
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
            text: 'Data Produksi Berhasil Diperbarui',
            showConfirmButton: false,
            timer: 1500
        });
        // Redirect to another page if needed
        window.location.href = 'data-produksi.html';
    })
    .catch(error => {
        console.error("Error saat melakukan PUT data:", error);
        // Handle specific error message
        if (error.message === 'Gagal memperbarui data Produksi') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data Produksi!',
            });
        } else {
            // Handle other errors
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Gagal memperbarui data Produksi!',
            });
        }
    });
}