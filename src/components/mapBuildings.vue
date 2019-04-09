<template>
	<div class="container">
		<h4>LOCATEE BUILDING'S MAP</h4>
		<l-map
		 :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-circle-marker
      	:radius="checkRadius(building.totalDesks)"
        :color="checkColor(building.occupiedDesks*100/building.totalDesks)"
      	:key="index"
		v-for="(building,index) in buildings"
       :lat-lng="latLng(building.latitude, building.longitude)">66
       <l-tooltip>{{building.code}}</l-tooltip>
  	 </l-circle-marker>
    </l-map>

	</div>
</template>

<script>
	import {LMap, LTileLayer, LMarker, LCircleMarker, LTooltip } from 'vue2-leaflet';

	export default {
		data: function(){
			return{
				 zoom:2,
      			 center: L.latLng(18.757243, 18.757243),
     			 url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
     			 attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			}
		},
		methods: {
			latLng: function(lat, lng){
				return L.latLng(lat, lng);
			},

			checkRadius: function(radius){
			let size = (radius <= 500) ? 5 : (radius <= 1000) ? 10 : (radius <= 1500) ? 15 : 20;
			return size;
  
			},

			checkColor: function(color){
			let colorBuilding = (color <= 25) ? '#FF4500' : (color <= 50) ? 'orange' : (color <= 75) ? 'yellow' : 'green';
			return colorBuilding;
			}
		},

		
		components: {
			 LMap,
      	     LTileLayer,
        	 LMarker,
        	 LCircleMarker,
        	 LTooltip
		},

		props: {
			buildings: Array
			}
		}

</script>

<style scoped>
.container {
	height: 500px;
	width: 950px;
	margin: 0 auto;
}

</style>