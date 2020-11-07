<template>
    <div id="map"></div>
</template>

<script>
import dataProvider from '../dataProvider';
import * as mapboxgl from "mapbox-gl";

import pubsub from 'pubsub-js'

export default {
    name: "MapBoxView",
    data(){
        return{
            loading: true,
        }
    },
    watch:{
        focus:function(){

        }
    },
    mounted(){
        this.map = "";
        this.mapInit(this);
        this.mapLoadGeojson(this);
    },
    methods:{
        addRegion2Map(features){
            this.map.addSource("region_json",{
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: features.features
                }
            });
            //console.log(features);
            if(this.data!=''){

            }
            this.map.addLayer({
                id: "region",
                type: "fill",
                source: "region_json",
                paint:{
                    "fill-color": "#fff",
                    "fill-opacity":0.1
                },
                /*minzoom: 7,
                maxzoom: 10*/
            });
            this.map.addLayer({
                id: "region_boundry",
                type: "line",
                source: "region_json",
                paint: {
                    "line-width": 0.5,
                    "line-color": "white"
                },
                /*minzoom: 7,
                maxzoom: 10*/
            });
        },
        mapDrawPoint(features){
            // Add a GeoJSON source with 2 points
            this.map.addSource("points", {
                type: "geojson",
                data: {
                    "type": "FeatureCollection",
                    "features":features.features
                }
            });
            // Add a symbol layer
            this.map.addLayer({
                id: "points",
                type: "circle",
                source: "points",
                paint:{
                    "circle-color":"#e1eed3",
                    "circle-radius": 7,
                },
            });
            this.map.addLayer({
                id: "region-label",
                type: "symbol",
                source: "points",
                layout: {
                    "text-field": "{name}",
                    "text-size": 15,
                    'text-offset': [-1.5,0]
                },
                paint: {
                    "text-color": "black",
                },
                maxzoom: 20,
            });
        },
        mapChangePointColor(features){
            this.map.addSource("change", {
                type: "geojson",
                data: {
                    "type": "FeatureCollection",
                    "features":features.features
                }
            });
            this.map.addLayer({
                id: "hover",
                type: "circle",
                source: "change",
                paint:{
                    "circle-color":"#00BFFF",
                    "circle-radius": 10,
                },
                filter:["==","name",""]
            });
            this.map.on("click","points", e=>{
                this.map.setFilter(
                    "hover",
                    ["in","name"].concat(e.features.map(feature => feature.properties.name))
                )
            })
        },
        mapInit(that) {
            mapboxgl.accessToken =
                "pk.eyJ1Ijoia3Vua3VueXkiLCJhIjoiY2tna2pxNm8wMDIwcTJ4bzFmZmN3cnBmaSJ9.lIlQrcMFrHeWPQpL-03ETg";
            this.map = new mapboxgl.Map({
                container: "map", // container id
                style: "mapbox://styles/kunkunyy/ckgm6eho60oe719sd26f2vrmv", // stylesheet location
                center: [101.778916, 36.623178], // starting position [lng, lat]
                zoom: 3.8 // starting zoom
            });
        },
        mapLoadGeojson(that) {
            this.map.on("load", function() {
                dataProvider.getRegionJson().then(
                    response => {
                        that.data = response.data;
                        that.addRegion2Map(that.data);
                    },
                    error => {
                        that.loading = false;
                    }
                );
                dataProvider.getCityPointJson().then(
                    response =>{
                        that.data = response.data;
                        that.mapDrawPoint(that.data);
                        that.mapChangePointColor(that.data);
                    },
                    error => {
                        that.loading = false;
                    }
                );
                that.mapAddCircle(that);
            });
        },
        mapAddCircle(that){
            that.map.on("click","points", e =>{
                var cityName = e.features[0].properties.name;
                // console.log(cityName);
                pubsub.publish("getCityData",cityName.substr(0,cityName.length-1));
            })
            that.map.on('mouseenter', 'points', function () {
                that.map.getCanvas().style.cursor = 'pointer';
            });
            that.map.on('mouseleave', 'points', function () {
                that.map.getCanvas().style.cursor = '';
            });
        }
    }
}
</script>

<style lang="css">
div #map {
  position: absolute;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
</style>