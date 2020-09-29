//READ JSON USING D3
d3.json("samples.json").then(function(sampleData){
    console.log(sampleData);

    //Set variables for OTUs (VIEW FROM CONSOLE LOG, SEE LINE 4)
    var otu_values = sampleData.samples[0].sample_values
    var otu_ids = sampleData.samples[0].otu_ids 
    var otu_labels = sampleData.samples[0].otu_labels
    
    //Slice to get the Top 10s of ID, Values. and their respective Labels
        
        //IDs
        var OTU_Top_ID_Values = otu_ids.slice(0,10).reverse();
            //Set ID's to desired format for graph (Adding the "OTU" before ID number.. ie. OTU 1167)
            var OTU_Top_ID = OTU_Top_ID_Values.map(d => "OTU " + d) 
        //console.log(OTU_Top_ID);

        //Values
        var OTU_Top_Values = otu_values.slice(0,10).reverse();
        //console.log(OTU_Top_Values);

        //Labels for Hoverover
        var OTU_Top_Labels = otu_labels.slice(0,10).reverse();
        //console.log(OTU_Top_Labels);

    //BAR CHART
    var trace = {
        x: OTU_Top_Values,
        y: OTU_Top_ID,
        mode: "markers",
        text: OTU_Top_Labels,
        type: "bar",
        orientation: "h",
    };
    var data = [trace];
    var layout = {title: "Top 10 OTUs"};
    Plotly.newPlot("bar", data, layout);
}); 
