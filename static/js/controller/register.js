import { UrlRegister } from "./template.js";

// Fungsi untuk melakukan login
function register() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role_id").value;

    fetch(UrlRegister, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role_id: parseInt(role),
        })
    })
    .then(response => response.json())
    .then(data => {
        // Jika login berhasil
        if (data.msg === "Pengguna berhasil terdaftar") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Registrasi Berhasil!',
                text: 'Anda berhasil registrasi.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                window.location.href = "index.html";
            });
        } else {
            // Jika login gagal karena alasan lain
            Swal.fire({
                title: 'Registrasi Gagal!',
                text: 'Data Sudah Digunakan.',
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
document.getElementById("registerButton").addEventListener("click", register);