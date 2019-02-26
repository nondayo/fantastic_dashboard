// AJAX
// $.ajax({
//     dataType: 'json',
//     url: 'http://localhost:12345/data',
//     type: 'post',
//     data: {
//         size: "week"
//     },
//     success: function (dat) {
//         if (dat == null) {
//             alert("null");
//         } else {
//             let linechart = document.getElementById("myChart").getContext('2d');

//             new Chart(linechart, {
//                 type: 'line',
//                 data: {
//                     labels: JSON.parse(dat[0]).data.map(x => x.x),
//                     datasets: [{
//                         fill: false,
//                         label: 'My dataset',
//                         data: JSON.parse(dat[0]).data.map(x => x.y)
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     title: {
//                         display: true,
//                         text: 'Chart.js Line Chart'
//                     },
//                     tooltips: {
//                         mode: 'index',
//                         intersect: false,
//                     },
//                     hover: {
//                         mode: 'nearest',
//                         intersect: true
//                     },
//                     scales: {
//                         xAxes: [{
//                             display: true,
//                             scaleLabel: {
//                                 display: true,
//                                 labelString: 'Month'
//                             }
//                         }],
//                         yAxes: [{
//                             display: true,
//                             scaleLabel: {
//                                 display: true,
//                                 labelString: 'Value'
//                             }
//                         }]
//                     }
//                 }
//             });
//         }
//     }
// });

// AJAX 另一種寫法
// const postdata = [];
// $.ajax({
//     dataType: 'json',
//     url: 'http://localhost:12345/data',
//     async: false,
//     type: 'post',
//     data: {
//         size: "week"
//     },
//     success: function (dat) {
//         if (dat == null) {
//             alert("null");
//         } else {
//             return (postdata.push(dat));
//         }
//     }
// });
// plot(postdata);

// acync/await 
async function doAjaxweek(args) {
    return $.ajax({
        dataType: 'json',
        url: 'http://localhost:12345/data',
        async: false,
        type: 'post',
        data: {
            size: "week"
        }
    });
}

async function doAjaxMonth(args) {
    return $.ajax({
        dataType: 'json',
        url: 'http://localhost:12345/data',
        async: false,
        type: 'post',
        data: {
            size: "month"
        }
    });
}

async function drawWeek() {
    let postData = await doAjaxweek().catch(err => {
        $('#myError').modal("show")
    });
    plot(postData);
};

async function drawMonth() {
    let postData = await doAjaxMonth().catch(err => {
        $('#myError').modal("show")
    });
    plot(postData);
};
drawMonth();
document.getElementById("monthButton").addEventListener('click', drawMonth);
document.getElementById("weekButton").addEventListener('click', drawWeek);

function plot(dat) {
    let linechart = document.getElementById("myChart").getContext('2d');
    new Chart(linechart, {
        type: 'line',
        data: {
            labels: JSON.parse(dat[0]).data.map(x => x.x),
            datasets: [{
                fill: false,
                label: 'My dataset',
                data: JSON.parse(dat[0]).data.map(x => x.y)
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    });
};