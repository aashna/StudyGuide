var Views = function(filePath1, filePath2) {

    function constructor(filePath1, filePath2) {
        return {
            displayTotal: displayTotal,
            displayIndividual: displayIndividual,
            fillOptsforIndividual_Videos: fillOptsforIndividual_Videos,
            fillOptsForIndividual_Students: fillOptsForIndividual_Students,
            fillOptsforVideos: fillOptsforVideos
        };
    }
    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 1200 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        bisectDate = d3.bisector(function(d) {
            return d.second;
        }).left;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var y2 = d3.scale.linear().range([height, 0]);
    var radius = 6;

    var circleAttrs = {
        cx: function(d) {
            return x(d.second);
        },
        cy: function(d) {
            return y(d.numViews);
        },
        r: radius / 10,
        fill: "steelblue"
    };

    // Define the axes
    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
    var yAxisRight = d3.svg.axis().scale(y2).orient("right").ticks(10);

    video_code_map = { 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice4': 'e8aoiUL3ALg', 'i4x-Engineering-CS145-video-vid-triggers_demo_part_1': 'i3xwZw5VRMs', 'i4x-Engineering-CS145-video-vid-null_values': 'qdR2z_Ws56k', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice1': 'bycjnyo6x1Y', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice4': 'qdHqidsGfNU', 'i4x-Engineering-CS145-video-vid-data_modification_statements': 'qKNb8YQYTZg', 'i4x-Engineering-CS145-video-vid-olap-slice2': 'TZbPo9nfsXw', 'i4x-Engineering-CS145-video-vid-olap-slice1': 'jcl0unn73RY', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice3': 'SYIHyXJG29M', 'i4x-Engineering-CS145-video-vid-nonlinear_mutual_recursion-slice2': 'n5MopEcWPfI', 'i4x-Engineering-CS145-video-vid-transactions_introduction': 'FA85kHsJss4', 'i4x-Engineering-CS145-video-vid-table_variables_and_set_operators': 'thcqxTlSAmw', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice2': 'eSKr7URoVTM', 'i4x-Engineering-CS145-video-vid-view_modifications_introduction-slice1': 'oqvh6dwsIlA', 'i4x-Engineering-CS145-video-vid-materialized_views-slice2': 'y7NRvF4C-f8', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice1': 'cVQUvZh64Y8', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice1': 'O2wYl9UHFNc', 'i4x-Engineering-CS145-video-vid-json_introduction-slice2': '3ukOBr0jzL8', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice3': '5-dlz0YimR4', 'i4x-Engineering-CS145-video-vid-join_operators': 'oXd4mTA86MI', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice4': 'iKGbo9ifTyw', 'i4x-Engineering-CS145-video-vid-authorization-slice1': '4kFaxCGpvzE', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice4': 'BKHCf16-8dU', 'i4x-Engineering-CS145-video-vid-authorization-slice3': 'JDEuWknPPcM', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice5': '6akMaOrUdcI', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice2': 'bVg442ixI6k', 'i4x-Engineering-CS145-video-vid-authorization-slice4': '0nqd1XzhKMk', 'i4x-Engineering-CS145-video-vid-basic_select_statement': '4IxirOdp6bw', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice2': 'GFyEBCdkzbg', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice2': 'r6ALmAXRHQM', 'i4x-Engineering-CS145-video-vid-nosql_motivation': '7WsOhkwyY28', 'i4x-Engineering-CS145-video-vid-nosql_overview': 'JhBcTX4U2hs', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice1': 'zFeSglmrY78', 'i4x-Engineering-CS145-video-vid-olap_demo': 'cCZquWgw8IM', 'i4x-Engineering-CS145-video-vid-subqueries_in_where': 'IJPXosPGLTU', 'i4x-Engineering-CS145-video-vid-view_modifications_using_triggers': '7PR6Z0cSc3Q', 'i4x-Engineering-CS145-video-vid-shortcomings_of_bcnf_and_4nf': 'mYEc-5-C4bo', 'i4x-Engineering-CS145-video-vid-the_relational_model': 'spQ7IFksP9g', 'i4x-Engineering-CS145-video-vid-querying_relational_databases': 'nf1-h2GpEGc', 'i4x-Engineering-CS145-video-vid-nonlinear_mutual_recursion-slice1': 'Pqw61QtOk24', 'i4x-Engineering-CS145-video-vid-introduction_to_sql': 'wxFmiRwXcQY', "'video_id'": "'video_code'", 'i4x-Engineering-CS145-video-vid-motivation_and_overview': 'kaI9rQ6e7xQ', 'i4x-Engineering-CS145-video-vid-json_introduction-slice1': 'lutlvfe8YHU', 'i4x-Engineering-CS145-video-vid-constraints-slice2': 'Efd1lpZCWCM', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice3': 'jFiUUEPNVa8', 'i4x-Engineering-CS145-video-vid-constraints-slice1': 'EGeDJzdh--o', 'i4x-Engineering-CS145-video-vid-aggregation': '428B57dOxcE', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice1': '7L0mOMG_2ZE', 'i4x-Engineering-CS145-video-vid-basic_recursive_with_statement': 'Yceqbp_DKbA', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice3': 'MXjCExmMsaI', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice2': 'sciXmZFvJgg', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice1': '9asirG4WqLE', 'i4x-Engineering-CS145-video-vid-triggers_demo_part_2': 'GSYhvQVI_dE', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice3': '0wzEQFR2B_s', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice2': 'SSio_jhAmzg', 'i4x-Engineering-CS145-video-vid-view_modifications_introduction-slice2': 'cda1c2SO_9I', 'i4x-Engineering-CS145-video-vid-triggers_introduction': 's9iRD-zrxS0', 'i4x-Engineering-CS145-video-vid-indexes-slice1': 'Y7Qlc7f_u0o', 'i4x-Engineering-CS145-video-vid-basic_recursive_with_statement_demo': 'uU7JBM3cAWU', 'i4x-Engineering-CS145-video-vid-authorization-slice2': 'pel2wJFi-v8', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice4': 'eVa98I9CALs', 'i4x-Engineering-CS145-video-vid-subqueries_in_from_and_select': '8OCAxk1Rybg', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice2': '5pyIKGLqQLY', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice1': 'uLsy7BelTJ4', 'i4x-Engineering-CS145-video-vid-materialized_views-slice3': 'dVnWxS2T5zY', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice3': 'Jfy0gNNg2qk', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice2': '07iWNlfmLcg', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice1': 'A6VGW1_1UHA', 'i4x-Engineering-CS145-video-vid-introduction': 'D-k-h0GuFmE', 'i4x-Engineering-CS145-video-vid-json_demo': 'TjZLdJvm3to', 'i4x-Engineering-CS145-video-vid-materialized_views-slice1': 'Dz4djo4vwHA', 'i4x-Engineering-CS145-video-vid-indexes-slice2': 'HSnwW5Punm0', 'i4x-Engineering-CS145-video-vid-automatic_view_modifications': 'ES_vPbPI7Jw', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice3': '8IBQdb8IwBA', 'i4x-Engineering-CS145-video-vid-defining_and_using_views': 'x81SX-zqZIc', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice3': 'VXRhir7GQpQ', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice2': 'TroKfazVhwM', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice1': 'r_h9yBnNh0U', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice3': 'yMVUkaE436c' }

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([20, 0])
        .html(function(d) {
            console.log("PAuse time:  " + d.pause_time);
            return "<strong>Pause time:</strong> <span style='color:red'>" + d.pause_time + "</span>" + "<br>" + "<strong>Second:</strong> <span style='color:red'>" + d.video_current_time + "</span>";
        })

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) {
            return x(d.second);
        })
        .y(function(d) {
            return y(d.numViews);
        });

    var valueline2 = d3.svg.line()
        .x(function(d) {
            return x(d.video_current_time);
        })
        .y(function(d) {
            return y(d.pause_time);
        });

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);
    // Get the data
    d3.csv(filePath1, function(error, data) {
        d3.csv(filePath2, function(error2, data2) {


            data2.forEach(function(d) {
                d.video_current_time = +d.video_current_time;
                d.pause_time = +d.pause_time;
                console.log(d.video_current_time);
                console.log(d.pause_time);
            });

            data.forEach(function(d) {
                d.second = +d.second;
                d.numViews = +d.numViews;
            });

            y.domain([0, d3.max(data, function(d) {
                return d.numViews;
            })]);
            y2.domain([0, d3.max(data2, function(d) {
                return d.pause_time;
            })]);

            // Scale the range of the data
            x.domain([0, Math.max(
                d3.max(data, function(d) {
                    return d.second
                }),
                d3.max(data2, function(d) {
                    return d.video_current_time
                }))]);
            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Video second");

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + width + " ,0)")
                .call(yAxis)
                .append("text")
                .attr("x", 40)
                .attr("y", -25)
                .attr("dy", ".71em")
                .style("text-anchor", "")
                .style("fill", "steelblue")
                .text("Pause Time");

            svg.selectAll(".bar").data(data2).enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return x(d.video_current_time);
                })
                .attr("width", 20)
                .attr("y", function(d) {
                    return y2(d.pause_time);
                })
                .attr("height", function(d) {
                    return height - y2(d.pause_time);
                })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis2")
                .call(yAxisRight);

            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "translate(" + (width + 3) + "," + y(data[0].numViews) + ")")
                .attr("dy", "1em")
                .style("text-anchor", "end")
                .style("fill", "steelblue")
                .text("Number of Views");
        });

        var focus = svg.append("g")
            // .attr("class", "focus")
            .style("display", "none");

        // append the x line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "blue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);
        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "blue")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);
        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 4);
        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");
        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");
        //     .attr("dy", ".35em");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.second > d1.second - x0 ? d1 : d0;

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")");

            focus.select("text.y1")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")")
                .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
            focus.select("text.y2")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")")
                .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
            focus.select("text.y3")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")")
                .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
            focus.select("text.y4")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")")
                .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
            focus.select(".x")
                .attr("transform",
                    "translate(" + x(d.second) + "," +
                    y(d.numViews) + ")")
                .attr("y2", height - y(d.numViews));

            focus.select(".y")
                .attr("transform",
                    "translate(" + width * -1 + "," +
                    y(d.numViews) + ")")
                .attr("x2", width + width);
        }

        svg.on("click", function() {
            var x0 = d3.mouse(this)[0],
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.second > d1.second - x0 ? d1 : d0;
            var sel = document.getElementById('opts2');
            var video_id = sel.options[sel.selectedIndex].value
            var videoid = video_id.substring(video_id.lastIndexOf('/') + 1, video_id.length - 4);
            //video_id = video_id[video_id.length - 1];
            var youtube_url = 'https://www.youtube.com/watch?v=' + video_code_map[videoid] + '#t=' + d.second + 's';
            window.open(youtube_url, '_blank')
        })

    });

    // ** Update data section (Called from the onclick)
    function updateData(filename, filename2) {

        // Get the data again
        d3.csv(filename, function(error, data) {

            d3.csv(filename2, function(error2, data2) {

                data2.forEach(function(d) {
                    d.video_current_time = +d.video_current_time;
                    d.pause_time = +d.pause_time;
                    console.log(d.video_current_time);
                    console.log(d.pause_time);
                });
                data.forEach(function(d) {
                    d.second = +d.second;
                    d.numViews = +d.numViews;
                });

                y.domain([0, d3.max(data, function(d) {
                    return d.numViews;
                })]);
                y2.domain([0, d3.max(data2, function(d) {
                    return d.pause_time;
                })]);

                // Scale the range of the data
                x.domain([0, Math.max(
                    d3.max(data, function(d) {
                        return d.second
                    }),
                    d3.max(data2, function(d) {
                        return d.video_current_time
                    }))]);

                // Select the section we want to apply our changes to
                var svg = d3.select("body");

                // Make the changes
                svg.transition().select(".line") // change the line
                    .duration(750)
                    .attr("d", valueline(data));
                svg.transition().select(".x.axis") // change the x axis
                    .duration(750)
                    .call(xAxis);
                svg.transition().select(".y.axis") // change the y axis
                    .duration(750)
                    .call(yAxis);
                svg.transition().select(".y.axis2") // change the y axis
                    .duration(750)
                    .call(yAxisRight);

                var sel = svg.selectAll("rect").data(data2);

                sel.exit()
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return x(d.video_current_time);
                    })
                    .attr("y", function(d) {
                        return y2(d.pause_time);
                    })
                    .attr("height", function(d) {
                        return height - y2(d.pause_time);
                    })
                    .remove();

                sel.transition().duration(600)
                    .attr("x", function(d) {
                        return x(d.video_current_time);
                    })
                    .attr("y", function(d) {
                        return y2(d.pause_time);
                    })
                    .attr("height", function(d) {
                        return height - y2(d.pause_time);
                    });
                // .attr("width", 20)
                // updated data:
                bar.attr("x", function(d) {
                        return x(d.video_current_time);
                    })
                    .attr("y", function(d) {
                        return y2(d.pause_time);
                    })
                    .attr("height", function(d) {
                        return height - y2(d.pause_time);
                    });

                var focus = svg.select(".focus").data(data2);

                svg.selectAll("rect")
                    // .attr("class", "overlay")
                    // .attr("width", width)
                    // .attr("height", height)
                    .on("mouseover", function() { focus.style("display", null); })
                    .on("mouseout", function() { focus.style("display", "none"); })
                    .on("mousemove", mousemove);

                // Create Event Handlers for mouse
                function mousemove() {
                    var x0 = x.invert(d3.mouse(this)[0]),
                        i = bisectDate(data, x0, 1),
                        d0 = data[i - 1],
                        d1 = data[i],
                        d = x0 - d0.second > d1.second - x0 ? d1 : d0;

                    focus.select("circle.y")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")");

                    focus.select("text.y1")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")")
                        .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
                    focus.select("text.y2")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")")
                        .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
                    focus.select("text.y3")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")")
                        .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
                    focus.select("text.y4")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")")
                        .text(((d.second)) + " second,\n" + ((d.numViews)) + "views");
                    focus.select(".x")
                        .attr("transform",
                            "translate(" + x(d.second) + "," +
                            y(d.numViews) + ")")
                        .attr("y2", height - y(d.numViews));

                    focus.select(".y")
                        .attr("transform",
                            "translate(" + width * -1 + "," +
                            y(d.numViews) + ")")
                        .attr("x2", width + width);
                }
            });
        });
    }

    function fileExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    names = ['b2188b1517404f1b83c53f33e66919c4b0d8030b', 'b298fd55a681749952e06554f68e072a2a92340f', 'b84eb97df4200fac66bce27be9f671590c9ff32a', 'b885760f9b636e264b47b458dd2dbc6f7443d01d', 'ceeef2be5477c2747534b87f70e58961353da647', '29d2192b024c9492b5f81af5d0b3e3fcea7c4561', 'b48fdaa255a8ac58e1522659885a8e60a5b40a96', '7a51bd9d01a6a6034e384958e56bbbe04259380b', 'c570a7d37c984f08af287cf3ed44f28b7a8a2b23', 'b3b3136e2f8093f5eab06403673c4c10e4820aa4', 'c07726642d0f606a63f6567ae1dc35cc430720db', '241a18e38c4dcf03fd070bfc39be5576a84a276f', '892792c74fbd1bf67d3cf344f64f10279584a757', 'd0ffc8621d87f23e3e2b366564ed09371762be9e', '5c1c860d86f34b7cff0a9d37649cc1a693795ed5', 'b7d4f4470ab60d3fc5c60f4eba7f881803bcc027', '62a695a8fd0a50f8e2ed65ee0323ac42f86e4900', '9c1f93fefd5268eb59381a719d4a293947b70872', '654becc35c1079c54b7e880b1072ba1c8cf19cdf', 'a675024c357bc53d7c2d1a17e99d0931473b126e', 'cc1027d23ce8ff5faee001c048385260a791abbb', '3585e2f0da8ed10b5a09222034ada293a2ecca1f', 'b4f47e86754bca39e37d187ec0fb0e84af35fc1d', '319a966987ba5bb1f230a7aae7657711d1a7f335', '8bda36be2d6f84e72b46936ca855cde7925b3075', '33a9251a6f0f23d0d4f9fc85e512a2034f5ebdfe', '7154df0d20ed09ae5c54dec2f47d1465cf2172e6', '2db4c038900f34690af21a956e5f79931c4ebc84', '7b78a08ac73ac16bf3c7ef9a6cd005ff5a0b9f68', 'b5634c0f5ee746048e3b7d3324c5b920f97b69e1', '994800cba5ea384c2a88b33c0a6ec2bb8d2c4150', '5e5e8efb3f2900f2d63636059c82732bc06ee0dd', 'adbabb88e88ff4c3068b4d6bd8051c6935ef249a', '1503fcd58e140550c83d6f5d72542672ec5b3410', '1920ae02ab726d41f4c50360ee6bbd40dd6a2c25', 'e5186be78a4adb668552e2ea8d97639d8e91a4b8', '8e2314cde9eefaefc3c54d4b98ea5a677db8b53f', 'e34f5fc7bd2eac0331f365064734e2eff6ad74e2', 'fbdf4115f4fd9fb0ce2501efe62a8be21a9c208a', '1747b5ea661d9b5e715cbcd95a65da2f12b16bf5', '95b165121e15a5f4b9a211ca00f3afdd05be6d4a', '69e5e751c0b1780a5ed300ce409db140a3344301', '241c683d7591d9f1650940eb29dda21b6919cd95', '2f1efeb5399e40533e326c8c21ceca48aed91eeb', 'db8b0247526b82278b65e666464cb30487dcc526', '867efd6f0a0fd4116841bf0cc87bbb9c6ada5de1', '7fb900604f58d17388cc71c22b786a33cd04a9e8', '8345f1b23e329f4cf9a240fb90b087573ab9532b', '5f303e0c9bb9e79a0b34892ae8083d397fb15a72', '63c3081b8e638ec41802ebb180ebb335487ebb44', 'beccc18617cfd7ae0aae2512bbee6e8fe7ef8ee4', 'f00284c2905efd63cffb1fc6df2f6aa42e6faf7b', '2dad16b99aad07db1b6bce6803815e0cb4412019', 'a9e258c879e76ab705507acb9d0650ef786ed110', 'b00fd08219e39674896f0bfc8d429d62d2ead88c', '34033534a689ddae5d24b8f0d47efc8ba3b4619d', '4a2f31c90173ef1daf10c1a73f2f1881af076e23', '836a25787926b63e56ef757c8d7a507b5d1a970d', '79520306c6aa2d9957e00d377c4801e01294181b', '365aea3d35c3964512b6b129a997f213f7712a53', '1eb328f35a0102a81bbee4cb54fe79f59c21bc2d', '0c80b0395e3b5e2f354efe7322de2f1b09241d24', '630cf700dbc368c830026c80276838fdb536b44b', 'b7a68670323e6f25509f79033e45b4d4967897a9', '218fbe60f6517a09fe19b98ff31bc0e376a53ffc', '0b1501f3f6c92826850a1374c253ad637ddc1639', 'd114547f5c16d8f3e30c3a8202bb1ccc72613ddb', '4e6bec29aff12cc3bb87c9d67a47a8d7946cccda', '9da325293a5deb9684a333c1deb719f00031a249', '93370f6e3b274731ecadb74e381226fe6ff971d7', '0185a301084be7cd29caf9411fd75f22c969dc2b', 'f0814cd704cc470f3ac244b1aa34f38ee9fdf39e', 'edc1441e3e5d2fc9f0e89c76a6c2988ec5fd51ca', 'a83951dfc02e7c8f5cb4bd7772c06ab0ea5eae3d', '467e0ca55606b313b168c4791aa9d6262736a2f0', '9f8395cd9036242be8d532710614f9177ff65d26', '03f90b9db8a16e6f217e7b5651053558e4dde05a', '53a7b1367a71bbbb322c03d51dbc5d0a7125d0ca', '9a7649968f9cd34485517815f6e6d61e2fd35483', '8907678312920eebf9cb5f3ef121fc35ac6de521', 'ec296f2dfe89d5ad23cbd86d667127c1bb1e1360', 'f327321dc92f726fd02a9d281b14e399a6137b77', '847a303eb88d723e118b1ebd9f965b827518448d', '13bca06fa17dcf1dcc5afdb9cca33cd5379be020', 'c01d186dacdf93bd89796ea120db95a9a7f0924d', '5a3cfae3664f0226793463d19d7b9e7c516ff063', 'e6c91ecb0a22ac4dfec6ef02a6edea51c7018493', '9ede24c03a9d12d8d792679ba554ff2ae9133f10', '1b80c0335307c5770fb103a5a5101dc735066175', '8bf51af4ddb5c8e55c0743e2808c93ea9dd4ebfe', '6df7dd563af03d1293814dbb311c8bcb72400c25', '12fd87c5d3a37ece7b8cee5549d0ac31bcefdd69', '2576b0c859969b19aad7dff1639a858145db7a88', 'fd7b5ccd61503314a14dfaba2137cfae329dc2d8', '0caa4749e680ec546ce085dbab96fc9314389a0d', '599e858fde181d53522edc25c353612c2e722919', '71544179b8a86fe58633177b82b61a570f749ced', 'd588deebd2022b1c05a0a212a649bae22232ff0c', 'fe83746d421bf820840baf5bc5c6f73ca8da662e', '74300d4f281b0654e2eb6c5dfc0b4c9301054716', 'eaeac0fbb1090f81046eb6d631638a4144e6b5d8', '16eff9e9921674dadfd29897b343bf5cef75efdd', 'e8ffbc5b54124715b46ef3d36614e6802ad5af33', '6f41ff5255af5ac42a319a2805d8ec946c49d638', 'bf111864b8965367acfbbb9985ce5e7a1b8c3fef', 'c71594b8c669a2bcdd1fde3b7144b8abdd24008e', 'c1da4564637693dba77df975aa6a9aa023a608a5', 'b7a035499dd0b84b93422f50c33ec8546684c2e2', '2d86a04396b88910559c55e5792cce64830e5486', '9b18d4b83119d55c16c1a20abaff1bdd132d0955', '864b63e188abff4ebc7ae107295bbe055aac27ba', 'a30c4633451c6b3137dc2b7cca61db0716602099', '267854cf0629ea1370454cd0205d5294f70804db', 'a0a51662cc276b873290fc4e7d6ff64d72c93548', 'e1107260d6845cfb2a9d377cedd3305a52a8a0f9', '81c6e2e41307cf48c4df7c5638b8c077923d5956', '003dc184c0dc454254905a0ffb7f672683311a91', '887f83786e50a60cd513e034c4778459c6fb9f99', '4b8e913266cccd240184ef7912d941af6c5a14e2', '6534f294ba17732a57484a6159a7271b470c39ce', '698491db6796b76664c63e2a5354d23fba54f171', '6014617a4739bffa4cf24c95021108ed693a0b21', '43abffa7519d4381091888cd15d2d4421771666c', '7da99c7b56b69285c98948ec2e05ebf7e5c54f3e', '6af325d148b709051ed6df66e215b861e56c1ead', 'c282b5656f24b060e1aed3765ac1e2b73d0754ec', 'e878c8744a9435e9a5d83f73f20aeec5ebdd8c51', '30205cfe1927ffb12f48ddf57b3ff1dcd64b0579', '4b3bdb717ca6d55b06a6578dee4f219dc24eba01', '30c6f2fed69ea0e4d00f8801c306530344aaf3a3', 'e008eeb7aa5ece67a0703998eed7c7949a45c7b8', '5916c4cb6f68d397aff460a5d0e2dfa7f83447ad', '2ecd38627857fd843dc7b847f9b2832f41b608dc', 'c70620d7608f39daa47347a119d54b7318335a3c', '9a2d295619c8db24ae8c8356321d5b76c26a8055', 'ae921a38c3c718171ab4bb26c020414cb3cd499b', 'f50ff9e2ca1552a55fb7f039cae74bd3f4d93fe6', '91177d004371800cb352c5d4fdeb9d77cc87cb07', 'db8865062f9e0e003c046ea050a2c790f4104a14', '7d132334ba665a197a90fea1feee660ceaa90e6f', '805e155558235094f0ee340ac4573579575d241b', 'ff84181500d881ad3c3c5aa10ee2053897c25405', 'af86963ddaa9bf7a9463d8e5a6ddf3d1fcd21b04', 'ae28975406a94e6328ef1ca706127d8f246bde28', 'b5e864d82211051a5f2c63315975fb3b9a02ac72', '2a30a43ec46a319afd24dae0c187a6cee528995b', '57e9078f1824806f189e0bfa141ffc0d47b68f08', 'ff87d6ee25918f2fb795ae249d5123734f3d2a82', 'e06ec6b5cd5d75e5e98ae3751f5444f95f9ec393', '604ea5ce916d6e307c069721d58d262d8606b313', '81f3f5baabbff70bdbb00de6176af269af121150', '2a6e39ce1ae6df8af8c4b8492061fc071f535bbc', '19707762f5728d9590a64a90f3d8646594fc95db', '6682593ade7dcd953ebcfb616cf47c13b1b141b8', '502195170c7cd952bf419c37c72bec9c820b45c3', '5a91643d5c0c384426590d35bc062d49d4547a74', '422283cb96e5a3ebbb1e77453cea23644b89343d', '06e266fd305325c0982adf4a57a33441bed9ebc6', '8b7f8b121e8dabd53265e54b72470da0cb761b54', '9b3f4dace8df6cb2a9f4ff9da27a95af058def85', '30e305a72617b5b83d9f39d72c13c745495eb9d2', 'ed0b4e33f6ee6bab5999acbfaea4c145ccf62e96', '6f094c33b6e7ee60261acd8dab4fc131239e290a', 'c24980800b955ca68f47e6ace127f4d348cd3005', '159e78c174a6adc3a3783bf923db8cb265c28e2b', 'f9176cbe7baac4bd5d7c1fba714e3108393d7553', '02532dc0c6280b23a15998ff94648b6ec6e9212e', '9d011178ab05f74c488d3edcf2126600d23b054b', '9475aee16a892d3e9364c3cf4d9b31a13d6709a6', 'd2835b7f196ff77fe2b16bfb858123119af69422', 'bc2e320d15bf9d2b5c45328e1e1bf9f264d1d11a', '36abd0b59c4f22e93e78f024be0f391694b7afc9', 'e41cf91ff7d33e9877f3fb734782cd5f35e98530', '75f2ce8c85b0ffb38340d5f7507447c7d87f9f67', 'ef897d22d4836185b97de86450084c96b1969230', 'dec8def1a90da22b9d05b9ed8d20a4ee1340e939', '088c3f595bbecca5d3d457daede77cc7aeca1d71', '1ea426de5a2ee918a158f576b54ab579865b2efa', 'af12fdf795f7dbf9947c6c4d03d8112c820b855c', '67fa8df46d9ceb81648ff48ed89bf7aa35bd8102', '08a4e3a99bbed85077758f5e32d4298ea2b55ca1', '1654ebdc4539cf3db86584a67a89a9b26ee508aa', '520cbc8f8dae397984ed4327e3aff04c05316d7d', '86b25e3a66a0e2710e444205161427b281fbcce0', '17ad804f1a96012f605cf19dfd7463f55f48cc17', 'db5a3668807d804e95e6d87a7c0dae0cb1d130cc', 'de62fa248851dab0d71f0860594b158aed15326b', '81e292f2c6f7dcb9f92f94fbd92e3ce0c205b149', '76a2c2737ace1203ebd80c2d6b7a87a4b338ecf8', '73be266aa450c3fa1453705a21e0821a378b325c', 'b77d9326697045256c6e69492bb7486dae6a0320', 'e937d2d8676c5fcd433c13a5082405c4a76e8f67', 'f6075e5610692bc783312fffe0d4a10ed0fff0ea', '59468626e924e455dbd1913e100862dc5896b364', '79f7e41e010b8472ae5d64ccb08cf8880d883e9a', '61d96941afd39b2899b3db5e6197de13bc9648df', '8498ba5311025969d22eb0b242d1c56db6f9f2b1', '49ed9566afa03eb30e9c0c2662d578205b8ebaff', 'b86ce03887625b8180d87e40988febf6b6be1d49', '656d838c69cfc1308ea1d75d99ca95ef0aba9f1b', '7dde419e0a7f983e070c6739a548b8c472d1207e', '466b7f389e4934dfea50b7b33925e13b1805af62', '76afa6b1156be2b61e3664941a055540e84b4718', 'c51df08b3eb7e57f25bead72e7309d06587d9831', '12b6524aaafe50a09cac47be2eeaef4f8527eb71', 'cc250e14d93f6a9c04486c4c1bc03212d5bf836d', '4f25c47ca68041aa99a23566a7bda6bcb0e3bc41', '0d84967300293703befa09dbd565144072193f11', '87408365030dfac5742995472396ed251bfacb5e', '8f1cd4208a03bbe9c7dac262a5fd54e13356e40a', '89931d420e782496af367be3a72c0bbbf9aaa43c', '359b7662e619521ec1820e79ae2612028bce295b', '952cb411ae5c0311feb8a5bf27b8f4835b87c33e', '9795b06c92b74565ec6972bde6510e84fd4793fc', '8f32a90fbf25e64f5351621ddb44e0cab837be8b', '6aa3b4fa9980b156ce14522f9cdc02865632d89c', 'ccb344124ddb3917c3a6892296f352db62b75f3b', '7eef7c6881d8a932dd185f6f09eaf5a6ab8a19d1', '81ab378be0c4d9309d4fc29c79f9709e00bf7709', '0920827f4db4e147d20795481d38fe006257d423', 'f4fb241ba5f8f3463ffef61083c1ec05c5cf1259', '622b1dc1778c242011ab1f6f1cfa88db5ae125ba', '77a48bc57e19a95de111f5d4a29337dfe1a341d1', '3d5dfa3ef35321016a6771765a74138c004fcfcb', '7d3e5996cd51ce6925d87ce544d46a408d8a076a', '6adb487e14cd0e16be68c7f28b39bfe457c5eb80', '8f230132c9d3c68b76f1007775f6af470c60c43b', '5bd9435ebc6cc1604970ec93acedbc4af6c09c33', 'af1af0cde43345c07b4847add3dcc534f6d09447', '81fca704f524d75e66c6f25ce3caf4d1306e4d86', '0ffffb8d8385441f698a2227f71454f4bd7e80a7', 'deba891d933589c79aede3661821fa2be1046455', 'cbeffc2a284479314360f111ed38adc25739a1e3', '67124d5e5865be817909fcadd2358946c9bfa891', 'bdf5fdc3ee84ff21100734db52b72d729757411f', '63f971cc20495ee9fef5d665074fadde1ab2ced0', '5ca8b21997c8778f86e21b0c771a9ff003b3a11a', '59d6e607d0d1dfc63b05c4b10116e3539ac9551b', '526b51e428c210456e1d98b82c3baeaec0850d46', '6712713a0743cef7a0b9c78404f3144f19d6c557', 'f6b721d71442e86cd22351a045b640fe3eaf7a0c', '25831ed47f399d1caeebba46da2f6bad2db7b8c3', '12dbddca942e3b6836f363ecab381b8c78ebe607', '75bea1e19998fa2552f50692d3ac6d16626d400e', '5eab981a07f3195be90be484a73b350a3ae21ab8', 'f5f16a7b530f6b1eacd3f7182f8e4094fe7c7b9d', 'ab96846ae143f0175a1065226ba4011d97425683', 'b8f62908d24ce28597f009e19c7846707b237ba7', '5c79390cf232098277a223c2d1e364cd1257868b', '27cdbd7e4a501602c0c2ec0077808bb34992eda9', 'f4e30c35425e32c33bed9935b966c640cdaa7823', '9fc9cb5aeba73d266d26ea151488520daf38e963', '8ab53479ebac2540aeed18996f39e13dfd13fd50', '14944e9814a45b4aee02b25c476d165228923094', '1af81dc38a30e9052187101dee860fcde0c9b24b', '49560ef4059bc2652d23cd1df4f6ed479dbd8ffb', '823e10441c8109033ba57b6ec23ba974f7327e86', 'a0f43a4284e6347a0b929d64f6ab465053fe8c5d', '909a80b003b74468747ac9584689bc5422f427f1', 'bd8f1033fe0c3d328611fe088e1efacacd04ed34', '56f899b87766a4bb725600e862740ccc72e051b9', 'c31c54362fad115d586e68a72f98dadfc37dac8b', '90047d832f950a139504252f9f86d6c486d38af0', '5217cf1db9ebc0237f5e0ff7590c63994f024474', '63a38c781a9744234ee5a453176583982de369c0', '305d923cc2ddd5c602a7b9f56cdd1ded14c88fea', '45af6896d86eb9bfeee89d720070cb892b6d28ea', '3e055917287abc39f7e94af1f481f9929714955b', 'eb2f6e6d539f98cc85329da30a28ca66aeb15f6d', 'efbe0653fd1c47d3b334d5ce01bc58cd753f84ed', '7ff1d9e4176cd73c19bca6c3770f25fc5df763c8', '0445ce5ab5896b03c56d3e46c68a4b319b9784ec', '1ef46b4bbdacdb3a87baceee57e516efc8c642ce', 'ae1a383c69c70717f0cc1eb1714d6c3853ed1ba4', 'bffe0181f1a9ca838dae9f38504c0a2a1a3acdfa', '3222bdbad235e7c7974465d9de29e33e1adb8b54', '5455929406f079e4eb9f7d0e2ab7269004ff52a6', 'af6eb0f63b80a60937147860ed29229ce27b6f44', '7b6f55e5d03e989e1dc846ace646fb5b5c07be90', '7eed44ac6c6b26191a838d0bf79144b0484a3bdb', '4f8fcecc86e5df60b1257b91b6a9869fb8462ad2', '9417675e9fadb39a430b5d45152416b5ba7bd97e', '84f16d9665099d8bd81d000ef6429e94a916578e', '57748bceef8c3d890ea50ae0549fe9c406524d3a', '26113a45020c06166d0b41586399c5a076e603cb', 'ca0144072d20dacb56e8b18625a63f389604f312', 'a2c4b72a6b5b5233ed103e7d24fa9d5f545cbc71', '50543215e4548f6c38319c9e110d51e2965e358c', '13e0cdc29b6aa0a1d9fef4b7755258bbff25b985', '2b09481b8ab4e03da6d1c857f40eff47658e3acd', 'a75cccab7c5bf5bfa2ab281e76d6394769171c93', 'f11f793dc4c0b4fe175599ad68c1cd092986f3ab', 'e22b43cfd7125f0cf78bb65db122328588101f50', 'f557a78734da3791e60d46774a73d917896e7853', 'fa78a886397ecdd969d3831effe99e22ddf24bf3', '6a136555df104a2dce5ac46d5c72ecba5011444c', '28925c11a24f2b8fe694937afcbc6adfd5901da5', '29ae653e5474e7b25cc1cb03df153e6a0a38968a', 'aa107a5ddbab86fe2d9403c507c489ed5c74d0d1', '99e84cb8d3b825a816f65834dfd7588ab31ea7d9', '85ea47eb890a6fa29a84b8f9f431bf1d520ee861', '7d4e878ba54c0781ddd0df24d5a35035133e042a', '7a0ff1be05158b9fc0fbd293ad92d572f0ef59ac', '1f430142c2d33fbc6316c1a9555c251570bd9d66', 'e1f12df5d9a2fc8b7b9d5598c236d9c00a0e0e5e', 'a41119a2b4c1d54d07191bc6cdef33f225c1d451', 'b52c9be56dd1baee15158b4cc5e3904d6e037567', '23b2301c2858b2d4459bb28fd71d4520d63921ec', '89fe26056f94da81fd8d0d8250881ba7600c516a', '204c986b0315bbf2be25b451fafd51493cc17929', '1aef61f15f9af707cb36e2359247994a8860d133', '7c901f27d086c4b99170fb4b28e5cb3eca5a6616', '00f28b30e296ed1c9a59154a447ff6a04fbfaa5b', '31118caf604963c4f1d891ab146a7e41590170c2', '849a8cca2374a1cc5d7975046f01ae97288a4043', 'b39c7e3027a2551e15ddf91f721c8576d440b4fd', '43c98af1667e610d77f562697bbce6248635dcf4', '1f37f345c3f690e0b449f4fdcc2b4b87fe5ecc45', '2b38e8967432d8efafa7809c0a1373ea20260944', '5573aee39679d0e5aa4b61d0ccba6aeca83b3daa', '9c1185a5c5e9fc54612808977ee8f548b2258d31', '9d6912b8cf677be18750a080967468791d81dd2b', 'a9cea04a542c2597cb849e22b36db4b16dc4b324', 'fab7fc0bc30fcd84defbb5ce2bd982aec55f17c0', '8882940e151b6af1b63d30991f67f70f70c3cfb1', '8ba634688e3b72ea2f543c4f529e5dbd1c7970d6', '8c36ad85f8e685c4f5f55aae1924648d837d58da', '8e788f897f8ddf3889503b2a24d00d7dfa35bb2f', 'c89531d6acab94cd2dba74b3c658f683456a0e28', 'f488a2247d293ff3b8da79969ed53c5539fd2aa7', '47cd83a9119b809c4b19d601eb42d1adf6ff250c', '12c64e15c432085ef25073dda7d4818d857a55c4', 'ccdab85cc80ae097661deb9439850ff987a503b9', 'f7b5057a561195be428f77036e0a8927b4e8ef95', '7a1c66b8fdc35cfcc5825a9e98a122c715557422', '75a91c3eb8c90853d9ccdf87930e73f97d482ab2', '1eea6ccedcf206453e67c7dcdecb01f939094917', 'a2b2fcaae917532c5ff02b25af027fe2e93a20fd', 'ea6fee465bdadedc1c2268a78fb44f6dc1e4c7d3', '7079cc8f6bf2b18eb2e714bfeef13050648f8c4e', '4b2277a54d5c4e930d1745265ed0fbe94eacc75a', '15af77ebd653740c5bbbd892420a48eb899b8be7', '4bf0e88a4375e71c9ba8ed7d7adca36c803f0f9c', '995f309a22670b4bb5360fc656353b843a0c0482', '2d70167854ff1512ebb04ef27081c062e0c38d2e', '8ec909dc552c93749ed3495bec1e0d9e2e3b8ed6', 'b7e194be71e2366a4ca6683d2af650b3297b17be', 'a85e3258f7f4c42448feb6106cc405e2ab2f2a52', '08346a98c3ba80d4d7e69bacbc89e3d2dabde172', '13e3ba0f0866ab0de4604001edaca3a0384a06be', '3253640dd2fe2813c6d131de1a47f922caf77822', 'c8afc560c4995370c7e99cbcf842a1a8394d212c', '9edd3d522a846a37d536995cf3c62b7f7b491eb3', '889576704ab38d4cf7424676c7571c5b56053eb9', '7d6b68685fa2371a899d54a1d31df65f9f0afa3a', 'f621b490cdd91fcbd0bc78473d3490df980a8f3c', '28a01cbaab80e871c9a676db4612a51d6b1aa554', '9cf673da12da323d5119a7e539d544fcad7a9968', '2113e73f8b9790207ef8466f9e459390596c6556', '62120628b40e323b68bbff56917ab91b7903f2fc', '6a382937e2bf7ce9885a2f7f16da0a978a4aea4d', '1da1d12eefb6fff725cd1b0c09644f70962c8078', '41a59584bc8e641dc387b30f2a38d7a26a8b84c7', 'b47611a7181659af95379be807846b73e012fe37', '9f44b5066f71f71efdd4e36c98af9b0e479f556e', 'ca79c2261f52bc5cd9a65ff3de5abcc9f4762cea', '905642ae8b7971b85fdf2d1c8361bff94512ec67', 'f51bdebbf1f6722fedbde77d7fd61899f8e1d9dc'];
    videos = ['i4x-Engineering-CS145-video-vid-authorization-slice2', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice3', 'i4x-Engineering-CS145-video-vid-null_values', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice1', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice4', 'i4x-Engineering-CS145-video-vid-olap-slice2', 'i4x-Engineering-CS145-video-vid-olap-slice1', 'i4x-Engineering-CS145-video-vid-data_modification_statements', 'i4x-Engineering-CS145-video-vid-introduction', 'i4x-Engineering-CS145-video-vid-nonlinear_mutual_recursion-slice2', 'i4x-Engineering-CS145-video-vid-nonlinear_mutual_recursion-slice1', 'i4x-Engineering-CS145-video-vid-table_variables_and_set_operators', 'i4x-Engineering-CS145-video-vid-basic_select_statement', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice3', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice2', 'i4x-Engineering-CS145-video-vid-subqueries_in_where', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice2', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice1', 'i4x-Engineering-CS145-video-vid-json_introduction-slice2', 'i4x-Engineering-CS145-video-vid-triggers_introduction', 'i4x-Engineering-CS145-video-vid-join_operators', 'i4x-Engineering-CS145-video-vid-authorization-slice4', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice4', 'i4x-Engineering-CS145-video-vid-nosql_motivation', 'i4x-Engineering-CS145-video-vid-materialized_views-slice1', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice4', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice1', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice5', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice2', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice3', 'i4x-Engineering-CS145-video-vid-functional_dependencies-slice3', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_1-slice1', 'i4x-Engineering-CS145-video-vid-materialized_views-slice2', 'i4x-Engineering-CS145-video-vid-nosql_overview', 'i4x-Engineering-CS145-video-vid-olap_demo', 'i4x-Engineering-CS145-video-vid-transactions_properties-slice3', 'i4x-Engineering-CS145-video-vid-view_modifications_using_triggers', 'i4x-Engineering-CS145-video-vid-shortcomings_of_bcnf_and_4nf', 'i4x-Engineering-CS145-video-vid-the_relational_model', 'i4x-Engineering-CS145-video-vid-querying_relational_databases', 'i4x-Engineering-CS145-video-vid-introduction_to_sql', 'i4x-Engineering-CS145-video-vid-motivation_and_overview', 'i4x-Engineering-CS145-video-vid-automatic_view_modifications', 'i4x-Engineering-CS145-video-vid-authorization-slice3', 'i4x-Engineering-CS145-video-vid-constraints-slice2', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice3', 'i4x-Engineering-CS145-video-vid-constraints-slice1', 'i4x-Engineering-CS145-video-vid-aggregation', 'i4x-Engineering-CS145-video-vid-basic_recursive_with_statement_demo', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice4', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice3', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice2', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice1', 'i4x-Engineering-CS145-video-vid-triggers_demo_part_2', 'i4x-Engineering-CS145-video-vid-triggers_demo_part_1', 'i4x-Engineering-CS145-video-vid-relational_design_overview-slice2', 'i4x-Engineering-CS145-video-vid-transactions_introduction', 'i4x-Engineering-CS145-video-vid-materialized_views-slice3', 'i4x-Engineering-CS145-video-vid-view_modifications_introduction-slice2', 'i4x-Engineering-CS145-video-vid-referential_integrity-slice2', 'i4x-Engineering-CS145-video-vid-view_modifications_introduction-slice1', 'i4x-Engineering-CS145-video-vid-boyce-codd_normal_form-slice1', 'i4x-Engineering-CS145-video-vid-basic_recursive_with_statement', 'i4x-Engineering-CS145-video-vid-subqueries_in_from_and_select', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice2', 'i4x-Engineering-CS145-video-vid-isolation_levels-slice1', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice4', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice3', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice2', 'i4x-Engineering-CS145-video-vid-multivalued_dependencies-slice1', 'i4x-Engineering-CS145-video-vid-defining_and_using_views', 'i4x-Engineering-CS145-video-vid-json_demo', 'i4x-Engineering-CS145-video-vid-authorization-slice1', 'i4x-Engineering-CS145-video-vid-indexes-slice2', 'i4x-Engineering-CS145-video-vid-json_introduction-slice1', 'i4x-Engineering-CS145-video-vid-indexes-slice1', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice3', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice2', 'i4x-Engineering-CS145-video-vid-relational_algebra_part_2-slice1'];

    function fillOptsForIndividual_Students() {
        document.write("<optgroup label = 'Choose Student Id'>");
        document.write("<option selected disabled>Choose Student Id</option>");

        for (var i = 0; i < names.length; i++) {
            console.log(location.pathname);
            document.write("<option value='../data/individualViews/" + names[i] + "/'>" + names[i] + "</option>");
        }

    }

    function fillOptsforIndividual_Videos() {

        document.write("<optgroup label = 'Choose Video Id'>");
        document.write("<option selected disabled>Choose Video Id</option>");
    }

    function fillOptsforVideos() {
        for (var i = 0; i < videos.length; i++) {
            document.write("<option value='../data/totalViews/" + videos[i] + ".csv'>" + "Video" + videos[i] + "</option>");
        }
    }

    function displayIndividual() {

        // handle on click event
        d3.select('#opts').on('change', function() {

            var get_select = document.getElementById('opts2');

            for (var i = 0; i < videos.length; i++) {
                var filePath = this.value + videos[i] + ".csv";
                if (fileExists(filePath)) {
                    get_select.options[get_select.options.length] = new Option(videos[i], filePath);
                }
                // document.write("<option value='"+videos[i]+".csv'>"+videos[i]+"</option>");
            }

        });

        d3.select('#opts2').on('change', function() {
            var sel = document.getElementById('opts');
            var student_path = sel.options[sel.selectedIndex].value;
            var filepath = this.value;
            console.log(student_path);
            var parts = student_path.split('/');
            var filepath2 = '../data/interactions/' + parts[parts.length - 2] + '/pause_' + filepath.substring(filepath.lastIndexOf('/') + 1)
            console.log(filepath2);
            updateData(filepath, filepath2);
        });
    }

    function displayTotal() {
        // handle on click event
        d3.select('#opts2').on('change', function() {
            updateData(this.value);
        });
    }
    return constructor(filePath1, filePath2);
}
