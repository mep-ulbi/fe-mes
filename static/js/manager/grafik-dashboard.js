import { UrlProductions, UrlMachines, requestOptionsGet } from "../controller/template.js";

document.addEventListener('DOMContentLoaded', function () {
    // Mengambil data produksi dan mengupdate grafik yang sesuai
    fetchData(UrlProductions, '#grafikProduksi .ct-chart-sales-value');
    // Mengambil data mesin dan mengupdate grafik yang sesuai
    fetchData(UrlMachines, '#grafikMesin .ct-chart-sales-value');

    function fetchData(url, chartSelector) {
        fetch(url, requestOptionsGet)
            .then(function(response) {
                return response.json();  // Mengubah response menjadi JSON
            })
            .then(function(jsonData) {
                var data = {
                    labels: [],
                    series: [[]]
                };

                // Memproses data untuk mengisi labels dan series
                jsonData.data.forEach(function (item) {
                    var date = new Date(item.createdAt);
                    var dateStr = date.toISOString().split('T')[0];  // Mengambil hanya tanggal

                    var index = data.labels.indexOf(dateStr);
                    if (index === -1) {
                        data.labels.push(dateStr);
                        data.series[0].push(1);  // Tambah entri baru untuk tanggal ini
                    } else {
                        data.series[0][index] += 1;  // Menambah jumlah pada tanggal yang ada
                    }
                });

                // Pengaturan opsi untuk grafik
                var options = {
                    low: 0,
                    showArea: true,
                    fullWidth: true,
                    axisX: {
                        labelInterpolationFnc: function(value, index) {
                            return index % 1 === 0 ? value : null;
                        }
                    }
                };

                // Membuat grafik garis dengan Chartist
                new Chartist.Line(chartSelector, data, options);
            })
            .catch(function(error) {
                console.error('Error fetching data: ', error);
            });
    }
});
