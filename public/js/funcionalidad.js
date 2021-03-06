const socket = io();
let counter = 0;
socket.on('arduino:data', function(data){
    myChart1.data.labels = data.map(v => v.time);
    myChart2.data.labels = data.map(v => v.time);
    myChart3.data.labels = data.map(v => v.time);
    myChart4.data.labels = data.map(v => v.time);
    myChart4.data.labels = data.map(v => v.time);

    myChart1.data.datasets[0].data = data.map(v => v.sensor1);
    myChart2.data.datasets[0].data = data.map(v => v.sensor2);
    myChart3.data.datasets[0].data = data.map(v => v.sensor3);
    myChart4.data.datasets[0].data = data.map(v => v.sensor4);
    myChart5.data.datasets[0].data = data.map(v => v.sensor4);

    console.log(data.map(v => v.sensor1)[0]);
    myChart1.data.datasets[0].label = "SENSOR 1: " + data.map(v => v.sensor1)[0] + " °C";
    myChart2.data.datasets[0].label = "SENSOR 2: " + data.map(v => v.sensor2)[0] + " °C";
    myChart3.data.datasets[0].label = "SENSOR 3: " + data.map(v => v.sensor3)[0] + " °C";
    myChart4.data.datasets[0].label = "SENSOR 4: " + data.map(v => v.sensor4)[0] + " °C";

    myChart5.data.labels[0] =  data.map(v => v.sensor4)[0] + "volts";

    counter++;
    myChart1.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();
})

const ctx1 = document.getElementById('myChart1').getContext('2d');
const myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['TIEMPO'],
        datasets: [{
            label: "SENSOR 1",
            backgroundColor: 'rgb(187, 79, 156 ,0.2)',
            borderColor: 'rgb(187, 79, 156 ,0.9)',
            fill:true,
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                max:50,
                min:0,
                beginAtZero: false,
                position: 'right'
            }
        },
        plugins: {
            zoom: {
                zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'y',
                }
            }
        },         
        responsive: false
    }
        
});


const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['TIEMPO'],
        datasets: [{
            label: "SENSOR 2",
            backgroundColor: 'rgb(79, 87, 187  ,0.2)',
            borderColor: 'rgb(79, 87, 187  ,0.9)',
            fill:true,
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                max:50,
                min:0,
                beginAtZero: false,
                position: 'right'
            }
        },
        plugins: {
            zoom: {
                zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'y',
                }
            }
        },         
        responsive: false
    }
});

const ctx3 = document.getElementById('myChart3').getContext('2d');
const myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['TIEMPO'],
        datasets: [{
            label: "SENSOR 2",
            backgroundColor: 'rgb(79, 187, 182  ,0.2)',
            borderColor: 'rgb(79, 187, 182  ,0.9)',
            fill:true,
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                max:50,
                min:0,
                beginAtZero: false,
                position: 'right'
            }
        },
        plugins: {
            zoom: {
                zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'y',
                }
            }
        },         
        responsive: false
    }
});

const ctx4 = document.getElementById('myChart4').getContext('2d');
const myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['TIEMPO'],
        datasets: [{
            label: "SENSOR 4",
            backgroundColor: 'rgb(79, 187, 122  ,0.2)',
            borderColor: 'rgb(79, 187, 122  ,0.9)',
            fill:true,
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                max:50,
                min:0,
                beginAtZero: false,
                position: 'right'
            }
        },
        plugins: {
            zoom: {
                zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'y',
                }
            }
        },         
        responsive: false
    }
});

const ctx5 = document.getElementById('myChart5').getContext('2d');
const myChart5 = new Chart(ctx5, {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [{
            label: "",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            fill:true,
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max:50,
                min:0,
                beginAtZero: false,
                position: 'right'
            }
        },
        responsive: false
    }
});