// var mapdata = {
//     "type": "FeatureCollection",
//     "features": [{
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9998241,
//                     39.7471494
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 51
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9983545,
//                     39.7502833
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 52
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9963919,
//                     39.7444271
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 54
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9960754,
//                     39.7498956
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 55
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9933717,
//                     39.7477264
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 57
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9913392,
//                     39.7432392
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 58
//         },
//         {
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -104.9788452,
//                     39.6933755
//                 ]
//             },
//             "type": "Feature",
//             "properties": {
//                 "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
//             },
//             "id": 74
//         }
//     ]
// };

// Map
var mymap = L.map('mapid').setView([39.74739, -105], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

function onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

// Get mapdata
// acync/await 
async function doAjaxmap(args) {
    return $.ajax({
        dataType: 'json',
        url: 'http://localhost:12345/mapdata',
        type: 'get'
    });
}

async function getMapdata() {
    let mapData = await doAjaxmap().catch(err => {
        $('#myError').modal("show");
    });
    console.log(mapData);
    data = JSON.parse(mapData[0])
    console.log(data);

    L.geoJSON([data], {
        style: function (feature) {
            return feature.properties && feature.properties.style;
        },
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(mymap);
};
getMapdata();

// L.geoJSON([mapData], {

//     style: function (feature) {
//         return feature.properties && feature.properties.style;
//     },

//     onEachFeature: onEachFeature,

//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, {
//             radius: 8,
//             fillColor: "#ff7800",
//             color: "#000",
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.8
//         });
//     }
// }).addTo(mymap);