import { UrlMachines, requestOptionsPost } from "../controller/template.js";

// Fungsi untuk melakukan login
function tambahMesin() {
    var kode_mesin = document.getElementById("kode_mesin").value;
    var nama_mesin = document.getElementById("nama_mesin").value;

    fetch(UrlMachines, requestOptionsPost, {
        body: JSON.stringify({
            kode_mesin: parseInt(kode_mesin),
            nama_mesin: nama_mesin
        })
    })
    .then(response => response.json())
    .then(data => {
        // Jika login berhasil
        if (data.success) {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Tambah Data Mesin Berhasil!',
                text: 'Anda berhasil menambahkan data mesin.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                window.location.href = "data-mesin.html";
            });
        } else {
            // Jika login gagal karena alasan lain
            Swal.fire({
                title: 'Tambah Data Mesin Gagal!',
                text: 'Anda gagal menambahkan data mesin.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Listener untuk login ke Dashboard ketika tombol login ditekan
document.getElementById("tambahButton").addEventListener("click", tambahMesin);