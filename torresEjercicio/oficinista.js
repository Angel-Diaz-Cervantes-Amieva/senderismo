// Simulador de ritmo cardiaco para oficinista
// Mostrar gráfica azul en el div correspondiente

// Variables para simulación en tiempo real
let datosOficinista = [];
let etiquetasOficinista = [];
let ritmoActual = 75;
let rngMin = 60;
let rngMax = 80;
let oficinistaChart = null;
const mxPuntos = 12;

function generarRitmoOficinista() {
    // Obtener hora actual
    const ahora = new Date();
    const hora = ahora.getHours();

    // Cambia el rango según la hora (simula senderismo de 17 a 19)
    if (hora >= 10 && hora < 11) {
        rngMin = 110;
        rngMax = 140;
    } else {
        rngMin = 60;
        rngMax = 80;
    }

    // Simulación de ritmo cardiaco
    if (ritmoActual < rngMin) {
        ritmoActual += 1;
    } else if (ritmoActual > rngMax) {
        ritmoActual -= 1;
    } else {
        const cambio = Math.floor(Math.random() * 5) - 2;
        let nuevo = ritmoActual + cambio;
        if (nuevo < rngMin) nuevo = rngMin;
        if (nuevo > rngMax) nuevo = rngMax;
        ritmoActual = nuevo;
    }

    // Guardar datos para la gráfica
    etiquetasOficinista.push(ahora.toLocaleTimeString());
    datosOficinista.push(ritmoActual);
    if (etiquetasOficinista.length > mxPuntos) {
        etiquetasOficinista = etiquetasOficinista.slice(-mxPuntos);
        datosOficinista = datosOficinista.slice(-mxPuntos);
    }

    // Actualizar gráfica
    actualizarGraficaOficinista();
}

function actualizarGraficaOficinista() {
    const canvas = document.getElementById('grafica-oficinista');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!oficinistaChart) {
        oficinistaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: etiquetasOficinista,
                datasets: [{
                    label: 'Ritmo Cardíaco Oficinista',
                    data: datosOficinista,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointBackgroundColor: 'blue',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Simulación Ritmo Cardíaco Oficinista' }
                },
                scales: {
                    y: {
                        min: 50,
                        max: 150,
                        title: { display: true, text: 'Latidos por minuto (lpm)' }
                    },
                    x: {
                        title: { display: true, text: 'Hora del día' }
                    }
                }
            }
        });
    } else {
        oficinistaChart.data.labels = etiquetasOficinista;
        oficinistaChart.data.datasets[0].data = datosOficinista;
        oficinistaChart.update();
    }
}

// Iniciar simulación automática cada segundo
window.addEventListener('DOMContentLoaded', () => {
    actualizarGraficaOficinista();
    setInterval(generarRitmoOficinista, 1000);
});

