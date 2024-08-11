import { UrlUsers, requestOptionsPost } from "../controller/template.js";

// Fungsi untuk melakukan login
function tambahUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role_id").value;

    fetch(UrlUsers, requestOptionsPost, {
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
        if (data.message === "User created successfully") {
            // Tampilkan SweetAlert sukses
            Swal.fire({
                title: 'Tambah Data User Berhasil!',
                text: 'Anda berhasil menambahkan data user.',
                icon: 'success',
                timer: 1500,
                showConfirmButton : false
            }).then(() => {
                window.location.href = "data-user.html";
            });
        } else {
            // Jika login gagal karena alasan lain
            Swal.fire({
                title: 'Tambah Data User Gagal!',
                text: 'Anda gagal menambahkan data user.',
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
document.getElementById("tambahButton").addEventListener("click", tambahUser);