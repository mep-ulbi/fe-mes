import { UrlLogin } from "./controller/template.js";

// Fungsi untuk melakukan login
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch(UrlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Pisahkan Token
        const cleanToken = data.token.split('|')[1];

        // Jika login berhasil
        if (data.masuk_dashboard === "dashboard-manager.html") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Anda berhasil login.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                // Simpan access token dalam cookie
                document.cookie = "login=" + cleanToken;
                window.location.href = "pages/manager/dashboard.html";
            });
        } else if (data.masuk_dashboard === "dashboard-ppic.html") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Anda berhasil login.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                // Simpan access token dalam cookie
                document.cookie = "login=" + cleanToken;
                window.location.href = "pages/ppic/dashboard.html";
            });
        } else if (data.masuk_dashboard === "dashboard-operation.html") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Anda berhasil login.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                // Simpan access token dalam cookie
                document.cookie = "login=" + cleanToken;
                window.location.href = "pages/operation/dashboard.html";
            });
        } else if (data.masuk_dashboard === "dashboard-engineering.html") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Anda berhasil login.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                // Simpan access token dalam cookie
                document.cookie = "login=" + cleanToken;
                window.location.href = "pages/engineering/dashboard.html";
            });
        } else if (data.error === "Anda telah dilarang akses ke aplikasi ini.") {
            // Jika login gagal karena user telah dilarang akses
            Swal.fire({
                title: 'Akses Dilarang!',
                text: 'Anda telah dilarang akses ke aplikasi ini.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            // Jika login gagal karena alasan lain
            Swal.fire({
                title: 'Login Gagal!',
                text: 'Username atau password salah.',
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
document.getElementById("buttonLogin").addEventListener("click", login);