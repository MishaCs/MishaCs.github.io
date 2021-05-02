Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', function (data) {

    Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Bitcoin Price Chart'
        },

        navigator: {
            enabled: false
        },

        series: [{
            name: 'Bitcoin Price Chart',
            data: data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});
