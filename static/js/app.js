//DO BELOW FOR EACH INDIVIDUAL ID IN SAMPLES

// //READ JSON USING D3
d3.json("samples.json").then((sampleData)=>{
console.log(sampleData);
    
    //Set variables for OTUs (VIEW FROM CONSOLE LOG, SEE LINE 4)
    var otu_values = sampleData.samples[0].sample_values
    var otu_ids = sampleData.samples[0].otu_ids 
    var otu_labels = sampleData.samples[0].otu_labels
    
    //Slice to get the Top 10s of ID, Values and their respective Labels
        
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
        text: OTU_Top_Labels,
        type: "bar",
        orientation: "h",
    };
    var data = [trace];
    var layout = {title: "Top 10 OTUs"};
    Plotly.newPlot("bar", data, layout);

    // //BUBBLE GRAPH
    // var trace1 = {
    //     x:
    //     y:
    //     mode: "markers",
    //     markers: {
    //         size:
    //         color:
    //     }, 
    //     text: 
    // };

});

function buildBar(selectedID) {
    d3.json("samples.json").then((data) => {
      var sampledata = data.samples
      var filteredData = sampledata.filter(subjects => subjects.id == selectedID)[0];
      var trace1 = {
        x: filteredData.sample_values.slice(0, 10).reverse(),
        y: filteredData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        type: "bar",
        orientation: 'h'
      };
      var data = [trace1];
      var layout = {
        title: "",
        xaxis: { title: "" },
        yaxis: { title: "" }
      };
      Plotly.newPlot("bar", data, layout);
    })
  }

  function BuildDropDown() {
    // //build dropdown
    d3.json("samples.json").then((data) => {
      // add them to the dropdown
      var selection = d3.select("#selDataset")
      data.names.forEach(function (name) {
        selection.append("option")
          .text(name)
          .attr("value", name)
      })
    })
  }

  function buildBubble(selectedID) {
    d3.json("samples.json").then((data) => {
      var sampledata = data.samples
      var filteredData = sampledata.filter(subjects => subjects.id == selectedID)[0];
      var trace1 = {
        x: filteredData.otu_ids,
        y: filteredData.sample_values,
        mode: 'markers',
        marker: {
          color: filteredData.sample_values,
          opacity: .6,
          size: filteredData.sample_values,
        }
      };
      var data = [trace1];
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 1200,
      };
      Plotly.newPlot('bubble', data, layout);
    })
  }

  //similar to drop down, sel area of html, adding things to it.
  //not options bcs its a dropdown tag, some type of text
  //Display the sample metadata, i.e., an individual's demographic information.
  //Display each key-value pair from the metadata JSON object somewhere on the page.

  function buildDemo(selectedID) {
    d3.json("samples.json").then((data) => {
        var sampledata = data.metadata
        var filteredData = sampledata.filter(subjects => subjects.id == selectedID)[0];
        var selection = d3.select("#sample-metadata")
          selection.html("");
          Object.entries(filteredData).forEach(([key, value]) => {
            selection.append("h6").text(`${key}:${value}`);
          })
        })
      }

  // there is an event listener in the html
  // when the event listener is triggers, it will run "optionChanged"
  //this is telling the code what to do when a change is made, run the bar

    buildBar()
    BuildDropDown()
    buildBubble()
    buildDemo()

  function optionChanged(selectedID) {
    buildBar(selectedID)
    buildBubble(selectedID)
    buildDemo(selectedID)
    // put any of the code that needs to run after new selection
  }

