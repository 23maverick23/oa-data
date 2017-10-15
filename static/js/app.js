(function () {

    $(function () {
        createSmoothScrollLinks();
        createNavMenu();
        setReportOptions();

        // Reports
        // fetchReport83();
        fetchReport87();
        fetchReport88();

        fetchReport91();
        fetchReport92();

        fetchReports9394();
    });

    function createSmoothScrollLinks() {
        var topPadding = 60;
        $("a[href*='#']:not([href='#'])").click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
                || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - topPadding
                        }, 1000);
                        return false;
                }
            }
        });
    }

    function createNavMenu() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            })
        ;

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item')
        ;

    }

    function setReportOptions() {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
                decimalPoint: '.'
            }
        });
    }
    
    function fetchReport83() {
        $.ajax({
            url: "/api/report83",
            type: 'GET',
            success: function(response) {
                drawReport83(response)
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function drawReport83(data) {
        Highcharts.chart('chart_report83', {
            chart: {
                type: 'funnel'
            },
            title: {
                text: 'Project Funnel'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true
                    },
                    center: ['40%', '50%'],
                    neckWidth: '30%',
                    neckHeight: '25%',
                    width: '80%'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Projects by Project Stage',
                data: data
            }]
        });
    }

    function fetchReport87() {
        $.ajax({
            url: "http://127.0.0.1:5000/api/report87",
            type: 'GET',
            success: function(response) {
                drawReport87(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function drawReport87(data) {
        Highcharts.chart('chart_report87', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Weekly Average Utilization'
            },
            subtitle: {
                text: 'Grouped by Job Code'
            },
            xAxis: {
                categories: data['columns']
            },
            yAxis: {
                title: {
                    text: 'Utilization (%)'
                },
                labels: {
                    format: '{value}%'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:,.2f}%</b><br>'
            },
            series: data['values']
        });
    }

    function fetchReport88() {
        $.ajax({
            url: "http://127.0.0.1:5000/api/report88",
            type: 'GET',
            success: function(response) {
                drawReport88(response[0], response[1])
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function drawReport88(summary, detail) {
        // Create the chart
        Highcharts.chart('chart_report88', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Costs by Project'
            },
            subtitle: {
                text: 'Click the columns to view cost breakout.'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total Cost (USD)'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '${point.y:,.0f}'
                    }
                }
            },

            tooltip: {
                headerFormat: 'Column: <b style="color:{point.color}">{point.key}</b><br>',
                pointFormat: '<span style="font-size:11px">Project name: <b>{series.name}</b></span><br>' +
                             '<span style="font-size:11px">Value: <b>${point.y:,.0f}</b></span><br>'
            },

            series: [{
                name: 'Project Name',
                colorByPoint: true,
                tooltip: {
                    headerFormat: 'Project name: <b style="color:{point.color}">{point.key}</b><br>',
                    pointFormat: '<span style="font-size:11px">Project name: <b>{series.name}</b></span><br>' +
                                 '<span style="font-size:11px">Total cost: <b>${point.y:,.0f}</b></span><br>'
                },
                data: summary
            }],
            drilldown: {
                series: detail
            }
        });
    }

    function drawReport89(data) {
        // Make codes uppercase to match the map data
        $.each(data, function () {
            this.code = this.code.toUpperCase();
        });

        // Instanciate the map
        Highcharts.mapChart('container', {

            chart: {
                borderWidth: 1
            },

            title: {
                text: 'US population density (/km²)'
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series: [{
                animation: {
                    duration: 1000
                },
                data: data,
                mapData: Highcharts.maps['countries/us/us-all'],
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}'
                },
                name: 'Population density',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}/km²'
                }
            }]
        });
    }

    function fetchReport91() {
        $.ajax({
            url: "http://127.0.0.1:5000/api/report91",
            type: 'GET',
            success: function(response) {
                var template = $('#client-template').html();
                var html = Mustache.to_html(template, response);
                $('#client-table').html(html);
                drawReport91();
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function drawReport91() {
        Highcharts.SparkLine = function (a, b, c) {
            var hasRenderToArg = typeof a === 'string' || a.nodeName,
                options = arguments[hasRenderToArg ? 1 : 0],
                defaultOptions = {
                    chart: {
                        renderTo: (options.chart && options.chart.renderTo) || this,
                        backgroundColor: null,
                        borderWidth: 0,
                        type: 'area',
                        margin: [2, 0, 2, 0],
                        width: 120,
                        height: 20,
                        style: {
                            overflow: 'visible'
                        },

                        // small optimalization, saves 1-2 ms each sparkline
                        skipClone: true
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        startOnTick: false,
                        endOnTick: false,
                        tickPositions: []
                    },
                    yAxis: {
                        endOnTick: false,
                        startOnTick: false,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        tickPositions: [0]
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        hideDelay: 0,
                        shared: true,
                        padding: 0,
                        positioner: function (w, h, point) {
                            return { x: point.plotX - w / 2, y: point.plotY - h };
                        }
                    },
                    plotOptions: {
                        series: {
                            animation: false,
                            lineWidth: 1,
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            marker: {
                                radius: 1,
                                states: {
                                    hover: {
                                        radius: 2
                                    }
                                }
                            },
                            fillOpacity: 0.25
                        },
                        column: {
                            negativeColor: '#910000',
                            borderColor: 'silver'
                        }
                    },
                    exporting: {
                        enabled: false
                    }
                };

            options = Highcharts.merge(defaultOptions, options);

            return hasRenderToArg ?
                new Highcharts.Chart(a, options, c) :
                new Highcharts.Chart(options, b);
        };

        var start = +new Date(),
            $tds = $('td[data-sparkline]'),
            fullLen = $tds.length,
            n = 0;

        // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
        // can take some seconds, so we split the input into chunks and apply them in timeouts
        // in order avoid locking up the browser process and allow interaction.
        function doChunk() {
            var time = +new Date(),
                i,
                len = $tds.length,
                $td,
                stringdata,
                arr,
                data,
                chart;

            for (i = 0; i < len; i += 1) {
                $td = $($tds[i]);
                stringdata = $td.data('sparkline');
                arr = stringdata.split('; ');
                data = $.map(arr[0].split(', '), parseFloat);
                chart = {};

                if (arr[1]) {
                    chart.type = arr[1];
                }
                $td.highcharts('SparkLine', {
                    series: [{
                        data: data,
                        pointStart: 1
                    }],
                    tooltip: {
                        headerFormat: '<span style="font-size: 10px">Q{point.x}: </span>',
                        pointFormat: '<b>${point.y}.00</b>'
                    },
                    chart: chart
                });

                n += 1;

                // If the process takes too much time, run a timeout to allow interaction with the browser
                if (new Date() - time > 500) {
                    $tds.splice(0, i + 1);
                    setTimeout(doChunk, 0);
                    break;
                }
            }
        }
        doChunk();
    }

    function fetchReport92() {
        $.ajax({
            url: "http://127.0.0.1:5000/api/report92",
            type: 'GET',
            success: function(response) {
                var template = $('#project-template').html();
                var html = Mustache.to_html(template, response);
                $('#project-card-list').html(html);
                // drawReport92();
                $('.ui.progress').progress('reset').progress();
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function fetchReports9394() {
        var report93, report94;

        $.when(
            $.ajax({
                url: "http://127.0.0.1:5000/api/report93",
                type: 'GET',
                success: function(response) {
                    report93 = response;
                },
                error: function(error) {
                    console.log(error);
                }
            }),

            $.ajax({
                url: "http://127.0.0.1:5000/api/report94",
                type: 'GET',
                success: function(response) {
                    report94 = response;
                },
                error: function(error) {
                    console.log(error);
                }
            })

        ).then(function() {

            drawReports9394(
                report93.keys,
                report93.values,
                report94.keys,
                report94.values
            )

        });
    }

    function drawReports9394(keyA, dataA, keyB, dataB) {
        var categories = _.union(keyA, keyB);
        var dataACopy = _.clone(dataA);
        var dataBCopy = _.clone(dataB);
        var finalA = dataA.concat(dataBCopy.fill(null).slice(0, -1));
        var finalB = dataACopy.fill(null).slice(0, -1).concat(dataB);

        function sum(arr) { 
            // returns the sum total of all values in the array
            return _.reduce(arr, function(memo, num) { return memo + num}, 0); 
        }

        Highcharts.chart('chart_report9394', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Actual + Forecasted Revenue'
            },
            subtitle: {
                text: 'Rolling +/- 12 Months'
            },
            xAxis: {
                allowDecimals: false,
                categories: categories,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
                plotLines: [{
                    color: '#FF0000',
                    value: dataA.length - 1,
                    width: 2,
                    zIndex: 5,
                    label: {
                        text: 'This Month'
                    }
                }]
            },
            yAxis: {
                title: {
                    text: 'Revenue (USD)'
                },
                labels: {
                    format: '${value:,.0f}'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>${point.y:,.0f}</b>'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            labels: {
                items: [{
                    html: 'Total Revenue',
                    style: {
                        left: '20px',
                        top: '5px',
                        color: 'black'
                    }
                }]
            },
            series: [{
                name: 'Actual',
                data: finalA
            }, {
                name: 'Forecast',
                data: finalB
            }, {
                type: 'pie',
                name: 'Total Revenue',
                data: [{
                    name: 'Actual Revenue',
                    y: sum(dataA)
                }, {
                    name: 'Forecast Revenue',
                    y: sum(dataB)
                }],
                center: [40, 40],
                size: 65,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }

})();