// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

function optionChanged(selectedName){
    // value should be one of the ids from the names field of the dataset
    console.log(selectedName);


    d3.json("static/js/samples.json").then((data) => {
        console.log(data);
        var metaData = data.metadata;
        var sample_metadata = d3.select("#sample-metadata");
            // clear the input value
        sample_metadata.html("");
        
        Object.entries(metaData).forEach(([key, value]) => {
            if (value.id === parseInt(selectedName)) {
                Object.entries(value).forEach(([key, value]) => {
                    var row = sample_metadata.append("p");
                    row.text(`${key}:${value}`);  
                    console.log(value)
                });
            
        buildPlot();
                
            }
        });
    });
}



function init(){

    d3.json("static/js/samples.json").then((data) => {
        d3.select("#selDataset").selectAll('option')
            .data(data.names)
            .enter()
            .append('option')
            .classed('test', true)
            .attr("value", function(d){return d;})
            .text((d)=> d);
        
    });
}

init();




function buildPlot(){
    d3.json("static/js/samples.json").then((data) => {
        var dataset = d3.select('#selDataset').node().value;
        var samples = data.samples;
       
        //converting the value from selDataset into integer
        var valueData = parseInt(dataset);
        var valueId = data.metadata.map(row => row["id"])
        // get the index of the selected ID 
        var resultindex = valueId.indexOf(valueData, 0)
        console.log(resultindex)
        var results=[]
        // push the result index into results
        results.push(valueId[resultindex])
        
       
        var dataIds = samples[resultindex].otu_ids;
        console.log(dataIds);
        var dataSample = samples[resultindex].sample_values;
        console.log(dataSample);
        var dataLabels = samples[resultindex].otu_labels;
        console.log(dataLabels);

    // Slice the first 10 objects for plotting
        top10Sample = dataSample.slice(0, 10);  
        reversedTop10Sample = top10Sample.reverse();
        top10Ids = dataIds.slice(0, 10);  
        reversedTop10Ids = top10Ids.reverse();
        

    // Trace1 for the Data
        var trace1 = {
            x: reversedTop10Sample,
            y: reversedTop10Ids,
            text: dataLabels,
            
            type: "bar",
            orientation: "h"
        };
        
        // data
        var data = [trace1];
        // Apply the group bar mode to the layout
        var layout = {
            title: "Bar Chart",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
    // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data, layout);
        buildBubble();
    })
};
// @TODO: Build a Bubble Chart using the sample data
function buildBubble(){
    d3.json("static/js/samples.json").then((data) => {
        var dataset = d3.select('#selDataset').node().value;
        var samples = data.samples;
        //converting the value from selDataset into integer
        var valueData = parseInt(dataset);
        var valueId = data.metadata.map(row => row["id"])
        // get the index of the selected ID 
        var resultindex = valueId.indexOf(valueData, 0)
        console.log(resultindex)
        var results=[]
        // push the result index into results
        results.push(valueId[resultindex])
        
        var dataIds = samples[resultindex].otu_ids;
        console.log(dataIds);
        var dataSample = samples[resultindex].sample_values;
        console.log(dataSample);
        var dataLabels = samples[resultindex].otu_labels;
        console.log(dataLabels);

    

    // Trace1 for the Greek Data
        var trace = {
            x: dataIds,
            y: dataSample,
            text: dataLabels,
            mode: 'markers',
            type: "bubble",
            marker: {
                color: dataIds,
                size: dataSample,
                colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']]                    
                }
        };
        
        // data
        var data = [trace];
        // Apply the group bar mode to the layout
        var layout = {
            title: "Bubble Chart",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data, layout);
        
    })
}
