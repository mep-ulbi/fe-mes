// import { UrlProductions, requestOptionsPost } from "../controller/template.js";

// // Fungsi untuk melakukan login
// function tambahProduk() {
//     var kode_produk = document.getElementById("kode_produk").value;
//     var nama_produk = document.getElementById("nama_produk").value;
//     var tahapan_proses = document.getElementById("tahapan_proses").value;
//     var nama_proses_modul = document.getElementById("nama_proses_modul").value;
//     var detail_proses = document.getElementById("detail_proses").value;

//     fetch(UrlProductions, requestOptionsPost, {
//         body: JSON.stringify({
//             kode_produk: parseInt(kode_produk),
//             nama_produk: nama_produk,
//             tahapan_proses: tahapan_proses,
//             detail_proses: detail_proses,
//             nama_proses_modul: nama_proses_modul
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Jika login berhasil
//         if (data.success) {
//             // Tampilkan SweetAlert sukses
//             Swal.fire({
//                 title: 'Tambah Data Produksi Berhasil!',
//                 text: 'Anda berhasil menambahkan data produksi.',
//                 icon: 'success',
//                 timer: 1500,
//                 showConfirmButton : false
//             }).then(() => {
//                 window.location.href = "data-produksi.html";
//             });
//         } else {
//             // Jika login gagal karena alasan lain
//             Swal.fire({
//                 title: 'Tambah Data Produksi Gagal!',
//                 text: 'Anda gagal menambahkan data produksi.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// // Listener untuk login ke Dashboard ketika tombol login ditekan
// document.getElementById("tambahButton").addEventListener("click", tambahProduk);




import { UrlProductions } from "../controller/template.js";
// import {getCookie} from "../controller/cookies.js";

function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
// Fungsi untuk melakukan tambah produk
function tambahProduk() {
    var kode_produk = document.getElementById("kode_produk").value;
    var nama_produk = document.getElementById("nama_produk").value;
    var productionFile = document.getElementById("productionFile").files[0];

    var formData = new FormData();
    formData.append("kode_produk", kode_produk);
    formData.append("nama_produk", nama_produk);

    if (productionFile) {
        formData.append("productionFile", productionFile);
    }
    var token = getCookie('login') || localStorage.getItem('login');

    fetch(UrlProductions, {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
        
    })
    .then(response => response.json())
    .then(data => {
        if (data.response_code === 201) {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Tambah Data Produksi Berhasil!',
                text: 'Anda berhasil menambahkan data produksi.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "data-produksi.html";
            });
        } else {
            // Jika tambah produk gagal
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

// Listener untuk tombol tambah produk ketika tombol ditekan
document.getElementById("tambahButton").addEventListener("click", tambahProduk);
