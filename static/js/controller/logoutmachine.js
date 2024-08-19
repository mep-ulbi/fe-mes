// Menggunakan class untuk menargetkan semua tombol logout
document.querySelectorAll('.logoutButton').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Menghentikan tindakan default

        // Menampilkan SweetAlert untuk konfirmasi
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda akan keluar dari akun Anda.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Fungsi untuk menghapus cookie
                function deleteCookie(name) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                }

                // Menghapus cookie login atau token (sesuaikan dengan nama cookie autentikasi yang digunakan)
                deleteCookie('login');

                // Mengarahkan ke halaman index.html setelah konfirmasi
                window.location.href = 'http://127.0.0.1:5500/index.html';
            }
        });
    });
});
