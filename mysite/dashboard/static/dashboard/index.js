// acync/await 
async function doAjaxweek(args) {
    return $.ajax({
        dataType: 'json',
        url: 'http://localhost:8000/dashboard/data',
        async: false,
        // type: 'post',
        type: 'GET',
        // data: {
        //     size: "week"
        // }
    });
}

async function doAjaxMonth(args) {
    return $.ajax({
        dataType: 'json',
        url: 'http://localhost:8000/dashboard/data',
        async: false,
        // type: 'post',
        type: 'GET',
        // data: {
        //     size: "month"
        // }
    });
}

async function drawWeek() {
    let postData = await doAjaxweek().catch(err => {
        $('#myError').modal("show");
    });
    console.log(postData);
    plot(postData);
};

async function drawMonth() {
    let postData = await doAjaxMonth().catch(err => {
        $('#myError').modal("show");
    });
    console.log(postData);
    plot(postData);
};
drawMonth();

$('#monthButton').on('click', async event => {
    try {
        await drawMonth();
    } catch (err) {
        $('#myError').modal("show");
    }
})

$('#weekButton').on('click', async event => {
    try {
        await drawWeek();
    } catch (err) {
        $('#myError').modal("show");
    }
})

// 寫法要盡量維持一致性
// document.getElementById("monthButton").addEventListener('click', drawMonth);
// document.getElementById("weekButton").addEventListener('click', drawWeek);

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