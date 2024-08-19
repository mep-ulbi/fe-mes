


import { UrlMachines } from "../controller/template.js";
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
    var kode_mesin = document.getElementById("kode_mesin").value;
    var nama_mesin = document.getElementById("nama_mesin").value;
    var machineFile = document.getElementById("machineFile").files[0];

    var formData = new FormData();
    formData.append("kode_mesin", kode_mesin);
    formData.append("nama_mesin", nama_mesin);

    if (machineFile) {
        formData.append("machineFile", machineFile);
    }
    var token = getCookie('login') || localStorage.getItem('login');

    fetch(UrlMachines, {
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
                title: 'Tambah Data Mesin Berhasil!',
                text: 'Anda berhasil menambahkan data Mesin.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "data-mesin.html";
            });
        } else {
            // Jika tambah produk gagal
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

// Listener untuk tombol tambah produk ketika tombol ditekan
document.getElementById("tambahButton").addEventListener("click", tambahProduk);