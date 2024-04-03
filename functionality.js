/*
DATA ORDER:

0 - placeDcid,
1 - placeName,

2 - Date:Count_Person_Producer_WhiteAlone,
3 - Value:Count_Person_Producer_WhiteAlone,
4 - Source:Count_Person_Producer_WhiteAlone,

5 - Date:Count_Person_Producer_NativeHawaiianOrOtherPacificIslanderAlone,
6 - Value:Count_Person_Producer_NativeHawaiianOrOtherPacificIslanderAlone,
7 - Source:Count_Person_Producer_NativeHawaiianOrOtherPacificIslanderAlone,

8 - Date:Count_Person_Producer_HispanicOrLatino,
9 - Value:Count_Person_Producer_HispanicOrLatino,
10 - Source:Count_Person_Producer_HispanicOrLatino,

11 -Date:Count_Person_Producer_AsianAlone,
12 - Value:Count_Person_Producer_AsianAlone,
13 - Source:Count_Person_Producer_AsianAlone,

14 - Date:Count_Person_Producer_BlackOrAfricanAmericanAlone,
15 - Value:Count_Person_Producer_BlackOrAfricanAmericanAlone,
16 - Source:Count_Person_Producer_BlackOrAfricanAmericanAlone

-----------------------------------------------------------------


geoId/01,
Alabama,

2017,
59062,
https://www.nass.usda.gov/AgCensus/,2017,17,https://www.nass.usda.gov/AgCensus/,

2017,
566,
https://www.nass.usda.gov/AgCensus/,

2017,
139,
https://www.nass.usda.gov/AgCensus/,

2017,
4140,
https://www.nass.usda.gov/AgCensus/

 colors: ['#77B6EA', '#545454', "#7CF518", "#CC35F5", "#8518F5"],

*/
let states = [];
let white = [];
let PacificIslander = [];
let Hispanic = [];
let Asian = [];
let AfricanAmerican = [];


function buildObjects(temp) {

    temp = temp.split("\n");//BUILD AN ARRAY OUT OF ALL CSV FILE LINES


    let data = [];

    for (let i = 0; i < 50; i++) {
        let prepLine = temp[i].split(","); // CREATE AN ARRAY FROM EACH LINE BASED ON THE COMMAS
        if (i !== 0 && 1) {

            states.push(prepLine[1]);//build states as graph catagories

            if (!isNaN(prepLine[3]) && prepLine[3].length !== 0) {
                white.push(parseInt(prepLine[3]));
            } else {
                white.push(0);
            }
            if (!isNaN(prepLine[6]) && prepLine[6].length !== 0) {
                PacificIslander.push(parseInt(prepLine[6]));
            } else {
                PacificIslander.push(0);
            }

            if (!isNaN(prepLine[9]) && prepLine[9].length !== 0) {
                Hispanic.push(prepLine[9]);
            } else {
                Hispanic.push(0);
            }

            if (!isNaN(prepLine[12]) && prepLine[12].length !== 0) {
                Asian.push(parseInt(prepLine[12]));
            } else {
                Asian.push(0);
            }

            if (!isNaN(prepLine[15]) && prepLine[15].length !== 0) {
                AfricanAmerican.push(parseInt(prepLine[15]))
            } else {
                AfricanAmerican.push(0)
            }


            data.push({
                placeDcid: prepLine[0],
                placeName: prepLine[1],

                White_Date: prepLine[2],
                White_Value: prepLine[3],
                White_Source: prepLine[4],

                PacificIslander_Date: prepLine[5],
                PacificIslander_Value: prepLine[6],
                PacificIslander_Source: prepLine[7],

                Hispanic_Date: prepLine[8],
                Hispanic_Value: prepLine[9],
                Hispanic_Source: prepLine[10],

                Asian_Date: prepLine[11],
                Asian_Value: prepLine[12],
                Asian_Source: prepLine[13],

                AfricanAmerican_Date: prepLine[14],
                AfricanAmerican_Value: prepLine[15],
                AfricanAmerican_Source: prepLine[16],



            });//this is an example of how to build a JSON object from the imported csv file 
        }

    }

    buildChart();


    localStorage.setItem("agriculture", JSON.stringify(data));
}


//START FILE READER
const handleOnChange = () => {
    file = document.getElementById("csvFileInput").files[0];
    if (file) {
        document.getElementById("importBt").disabled = false;
    } else {
        console.log("file FAIL: " + file);
    }
};
const handleOnSubmit = (type) => {

    try {
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                let csvOutput = evt.target.result;

                if (type === "csv") {
                    buildObjects(csvOutput);
                }
            }
            reader.onerror = function (evt) {

                console.log("error csvOutput: " + csvOutput);

                return false;
            }
        }
    } catch (error) {
        globalAlert("alert-danger", "This data gave me an error: " + error);
        return false;
    }


};


/*START CHART JS*/


function buildChart() {


    console.log("states: " + states + " states.length: " + states.length);
    console.log("white: " + white + " white.length: " + white.length);
    console.log("PacificIslander: " + PacificIslander + " PacificIslander.length: " + PacificIslander.length);
    console.log("Hispanic: " + Hispanic + " Hispanic.length: " + Hispanic.length);
    console.log("Asian: " + Asian + " Asian.length: " + Asian.length);
    console.log("AfricanAmerican: " + AfricanAmerican + " AfricanAmerican.length: " + AfricanAmerican.length);

    var options = {
        series: [
            {
                name: "white",
                data: white
            },
            {
                name: "PacificIslander",
                data: PacificIslander
            },
            {
                name: "Hispanic",
                data: Hispanic
            },
            {
                name: "Asian",
                data: Asian
            },
            {
                name: "AfricanAmerican",
                data: AfricanAmerican
            }
        ],
        chart: {
            type: 'bar',
            height: 2500
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: '10px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: .5,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: states,
        },
    };

    var chart = new ApexCharts(document.getElementById("chart"), options);
    chart.render();



}