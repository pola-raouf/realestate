$(document).ready(function() {
    const pieCtx = document.getElementById('pieChart');
    const salesCtx = document.getElementById('salesLine');

    let pieData = initialPie || {};
    let salesDataSafe = salesData || [];

    const getPieLabels = (pie) => Object.keys(pie || {});

    let pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: getPieLabels(pieData),
            datasets: [{
                data: getPieLabels(pieData).map(l => pieData[l] || 0),
                backgroundColor: ['#a3c3d6','#f4b787','#cfd6e3','#d6a3c3','#87f4b7'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: { legend: { position: 'bottom' } },
            animation: { duration: 800 }
        }
    });

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                { label: 'Listings', data: salesDataSafe.map(x => x.listings || 0), borderColor: '#a3c3d6', backgroundColor: 'rgba(163,195,214,0.15)', fill:true, tension:0.35, pointRadius:0 },
                { label: 'Reservations', data: salesDataSafe.map(x => x.reservations || 0), borderColor: '#f4b787', backgroundColor: 'rgba(244,183,135,0.15)', fill:true, tension:0.35, pointRadius:0 },
                { label: 'Visitors', data: salesDataSafe.map(x => x.visitors || 0), borderColor: '#cfd6e3', backgroundColor: 'rgba(207,214,227,0.15)', fill:true, tension:0.35, pointRadius:0 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position:'bottom' } },
            scales: {
                x: { grid: { display:false } },
                y: { grid: { color:'#eef2f7' }, ticks: { stepSize:50 } }
            },
            animation: { duration: 800 }
        }
    });

    $('#clientSelect').change(function() {
        const clientId = $(this).val();

        $.ajax({
            url: '/dashboard/client-data',
            method: 'GET',
            data: { id: clientId },
            success: function(res) {
                if(res.error) return alert(res.error);

                $('#clientListings').text(res.listings || 0);
                $('#clientReservations').text(res.reservations || 0);
                $('#clientVisitors').text(res.visitors || 0);

                const newLabels = Object.keys(res.pie || {});
                pieChart.data.labels = newLabels;
                pieChart.data.datasets[0].data = newLabels.map(l => res.pie[l] || 0);
                pieChart.update();

                salesChart.data.datasets[0].data = res.sales.map(x => x.listings || 0);
                salesChart.data.datasets[1].data = res.sales.map(x => x.reservations || 0);
                salesChart.data.datasets[2].data = res.sales.map(x => x.visitors || 0);
                salesChart.update();
            },
            error: function(err) { console.error('AJAX error:', err); }
        });
    });

    $('#randomizeBtn').click(function() {
        const labels = pieChart.data.labels;
        pieChart.data.datasets[0].data = labels.map(() => Math.floor(Math.random()*30)+10);
        pieChart.update();
    });
});
