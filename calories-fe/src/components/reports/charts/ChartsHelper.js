export const getPieChartData = (lastWeek, weekBefore) => {
    return {
        series: [lastWeek, weekBefore],
        options: {
            chart: {
                width: '100%',
                type: 'pie',
            },
            labels: ['Last', 'Before last'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }
}

export const getBarChartData = (users, data) => {
    return {
        series: [{
            name: "Calories per user",
            data: data
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: users
            }
        }

    }
}