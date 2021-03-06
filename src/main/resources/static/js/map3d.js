require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/layers/SceneLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/request",
    "esri/widgets/Slice",
    "esri/widgets/Slice/SlicePlane",
    "esri/widgets/LayerList",
    "esri/core/Collection"
], function(Map, SceneView, GeoJSONLayer, SceneLayer,
    GraphicsLayer, Graphic, esriRequest, Slice,
    SlicePlane,
    LayerList,
    Collection) {
    var createGraphic = function(data) {
        return new Graphic({
            geometry: data,
            symbol: data.symbol,
            attributes: data,
            popupTemplate: data.popupTemplate
        });
    };

    const json_options = {
        query: {
            f: "json"
        },
        responseType: "json"
    };
    // request json
    esriRequest('http://localhost:8080/api/bitexco_json', json_options).then(function(response) {
        var graphicsLayer = new GraphicsLayer();
        /*console.log(response);*/
        response.data.forEach(function(data) {
            graphicsLayer.add(createGraphic(data));
        });
        map.add(graphicsLayer);
    });

    // geojson layer
    const bitexco = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 4,
                    material: {
                        color: "rgba(34,54,165,0.5)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });

    const bitexco2 = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 0.8,
                    material: {
                        color: "rgba(0,0,0,1)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });

    const bitexco_khung1 = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco_khung1.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 0,
                    material: {
                        color: "#61C3A2"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [0, 0, 0, 1],
                        size: 30
                    },
                }]
            }
        }
    });

    const bitexco_sanbay = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco_sanbay.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 2,
                    material: {
                        color: "rgb(34,54,165)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });


    const bitexco_hanhchinh = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco_hanhchinh_geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 4,
                    material: {
                        color: "rgba(34,54,165,0.5)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });

    const bitexco_hanhchinh2 = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco_hanhchinh1_geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 0.8,
                    material: {
                        color: "rgba(0,0,0,1)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });

    const bitexco_hanhchinh_bao = new GeoJSONLayer({
        url: "http://localhost:8080/api/bitexco_hanhchinh_bao.geojson",
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 20,
                    material: {
                        color: "rgba(0,0,0,1)"
                    },
                    edges: {
                        type: "solid", // autocasts as new SolidEdges3D()
                        color: [50, 50, 50, 0.5]
                    },
                }]
            }
        }
    });

    const map = new Map({
        basemap: "topo-vector",
        ground: "world-elevation",
        layers: [bitexco_hanhchinh_bao, bitexco, bitexco_sanbay, bitexco2, bitexco_khung1, bitexco_hanhchinh, bitexco_hanhchinh2] //end layers
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: [106.70558462670756, 10.76479345539322, 300],
            heading: 0,
            tilt: 75
        }
    });

    view.popup.defaultPopupTemplateEnabled = true;

    const slice = new Slice({
        view: view
    });

    // Add widget to the bottom left corner of the view
    view.ui.add(slice, {
        position: "top-right"
    });

    const excludedLayers = [];
    const sliceButton = document.getElementById("slice");
    const resetPlaneBtn = document.getElementById("resetPlaneBtn");
    const clearPlaneBtn = document.getElementById("clearPlaneBtn");
    const sliceOptions = document.getElementById("sliceOptions");
    const plane = new SlicePlane({
        position: {
            latitude: 10.771644654409855,
            longitude: 106.70418200024693,
            z: 417.75
        },
        tilt: 32.62,
        width: 29,
        height: 29,
        heading: 0.46
    });

    let sliceWidget = null;
    let doorsLayer = null;
    let sliceTiltEnabled = true;

    view.ui.add("menu", "top-right");

    resetPlaneBtn.addEventListener("click", () => {
        document.getElementById("tiltEnabled").checked = true;
        sliceTiltEnabled = true;
        sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
        sliceWidget.viewModel.shape = plane;
    });

    clearPlaneBtn.addEventListener("click", () => {
        // sliceWidget.viewModel.clear();
        slice.clear();
    });

    document
        .getElementById("tiltEnabled")
        .addEventListener("change", (event) => {
            sliceTiltEnabled = event.target.checked;
            sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
        });

    document
        .getElementById("color")
        .addEventListener("change", (event) => {
            if (event.target.checked) {
                // A renderer can be set on a BuildingComponentSublayer
                doorsLayer.renderer = {
                    type: "simple", // autocasts as new UniqueValueRenderer()
                    symbol: {
                        type: "mesh-3d", // autocasts as new MeshSymbol3D()
                        symbolLayers: [{
                            type: "fill", // autocasts as new FillSymbol3DLayer()
                            material: {
                                color: "red"
                            }
                        }]
                    }
                };
            } else {
                doorsLayer.renderer = null;
            }
        });

    // Add a layer list widget
    const layerList = new LayerList({
        view: view
    });

});
