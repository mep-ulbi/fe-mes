import { UrlLogin } from "./template.js";

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
        // Ambil token tanpa dipisah
        const fullToken = data.token;

        // Cek dan arahkan ke dashboard sesuai dengan role
        let redirectUrl = '';
        switch(data.masuk_dashboard) {
            case "dashboard-manager.html":
                redirectUrl = "pages/manager/dashboard.html";
                break;
            case "dashboard-ppic.html":
                redirectUrl = "pages/ppic/dashboard.html";
                break;
            case "dashboard-operation.html":
                redirectUrl = "pages/operation/dashboard.html";
                break;
            case "dashboard-engineering.html":
                redirectUrl = "pages/engineering/dashboard.html";
                break;
            default:
                if (data.error === "Anda telah dilarang akses ke aplikasi ini.") {
                    Swal.fire({
                        title: 'Akses Dilarang!',
                        text: 'Anda telah dilarang akses ke aplikasi ini.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Login Gagal!',
                        text: 'Username atau password salah.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                return;
        }

        // Jika login berhasil, tampilkan SweetAlert sukses dan arahkan ke dashboard
        Swal.fire({
            title: 'Login Berhasil!',
            text: 'Anda berhasil login.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            // Simpan access token dalam cookie
            document.cookie = "login=" + fullToken;
            window.location.href = redirectUrl;
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Listener untuk login ke Dashboard ketika tombol login ditekan
document.getElementById("buttonLogin").addEventListener("click", login);
