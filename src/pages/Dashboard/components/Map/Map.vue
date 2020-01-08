<template>
  <div>
    <div class="map" ref="map">

    </div>
  </div>

</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";

export default {
  name: "Map",
  props: {
    stats: Array
  },
  mounted() {
    let map = am4core.create(this.$refs.map, am4maps.MapChart);

    map.projection = new am4maps.projections.Mercator();

    let continentsSeries = map.series.push(new am4maps.MapPolygonSeries());
    continentsSeries.geodata = am4geodata_continentsLow;
    continentsSeries.useGeodata = true;
    continentsSeries.exclude = ["antarctica"];

    let continentTemplate = continentsSeries.mapPolygons.template;
    continentTemplate.tooltipText = "{name} - ilość serwerów: {value}";
    continentTemplate.properties.fillOpacity = 1;
    continentTemplate.propertyFields.fill = "color";
    continentTemplate.nonScalingStroke = true;

    continentsSeries.dataFields.zoomLevel = "zoomLevel";
    continentsSeries.dataFields.zoomGeoPoint = "zoomGeoPoint";

    const iad = this.stats.find(stats => stats.region === "iad");
    const iadValue = iad ? parseInt(iad.serverCount, 10) : 0;

    const sjc = this.stats.find(stats => stats.region === "sjc");
    const sjcValue = sjc ? parseInt(sjc.serverCount, 10) : 0;

    const nrt = this.stats.find(stats => stats.region === "nrt");
    const nrtValue = nrt ? nrt.serverCount : 0;

    const syd = this.stats.find(stats => stats.region === "syd");
    const sydValue = syd ? syd.serverCount : 0;

    const gva = this.stats.find(stats => stats.region === "gva");
    const gvaValue = gva ? gva.serverCount : 0;

    continentsSeries.data = [ {
      "id": "africa",
      "value": 0
    }, {
      "id": "asia",
      "value": nrtValue
    }, {
      "id": "oceania",
      "value": sydValue
    }, {
      "id": "europe",
      "value": gvaValue
    }, {
      "id": "northAmerica",
      "value": sjcValue + iadValue
    }, {
      "id": "southAmerica",
      "value": 0
    }];

    this.map = map;
  }
};
</script>

<style src="./Map.scss" lang="scss"/>
