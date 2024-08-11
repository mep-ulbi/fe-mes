import { UrlProductions, requestOptionsPost } from "../controller/template.js";

// Fungsi untuk melakukan login
function tambahProduk() {
    var kode_produk = document.getElementById("kode_produk").value;
    var nama_produk = document.getElementById("nama_produk").value;
    var tahapan_proses = document.getElementById("tahapan_proses").value;
    var nama_proses_modul = document.getElementById("nama_proses_modul").value;
    var detail_proses = document.getElementById("detail_proses").value;

    fetch(UrlProductions, requestOptionsPost, {
        body: JSON.stringify({
            kode_produk: parseInt(kode_produk),
            nama_produk: nama_produk,
            tahapan_proses: tahapan_proses,
            detail_proses: detail_proses,
            nama_proses_modul: nama_proses_modul
        })
    })
    .then(response => response.json())
    .then(data => {
        // Jika login berhasil
        if (data.success) {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Tambah Data Produksi Berhasil!',
                text: 'Anda berhasil menambahkan data produksi.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                window.location.href = "data-produksi.html";
            });
        } else {
            // Jika login gagal karena alasan lain
            Swal.fire({
                title: 'Tambah Data Produksi Gagal!',
                text: 'Anda gagal menambahkan data produksi.',
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
document.getElementById("tambahButton").addEventListener("click", tambahProduk);