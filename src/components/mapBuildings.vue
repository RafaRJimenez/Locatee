<template>
	<div class="container">
	{{currentCenter}} {{currentZoom}}

		<l-map
		 @update:zoom="zoomUpdate"
		 @update:center="centerUpdate"
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
				 zoom:3,
      			 center: L.latLng(47.413220, -1.219482),
      			 currentCenter: L.latLng(47.413220, -1.219482),
      			 currentZoom: 3,
     			 url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
     			 attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
     			 marker: L.latLng(47.413220, -1.219482),
     			  circle: {
       			  center: [47.413220, -1.0482],
       			  color: 'yellow'
      }
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
			},

			centerUpdate: function(center) {
				this.currentCenter = center

			},

			zoomUpdate: function(zoom) {
				this.currentZoom = zoom
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
			},
			  fill: {
    type: Boolean,
    custom: true,
    default: true
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