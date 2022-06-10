
var exampleData = {
    nodes: {
        x0: 128,
        y0: 128,
        xs: [],
        ys: [],
        ids: []
    }
}


function getData(id) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://wolforce-4ace.restdb.io/rest/concept/" + id,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "629f2f7cc4d5c3756d35a5fd",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        // console.log(response);
    });

}


function updateData(id, data) {

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://wolforce-4ace.restdb.io/rest/concept/${id}`,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "629f2f7cc4d5c3756d35a5fd",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

getData(ids[0])