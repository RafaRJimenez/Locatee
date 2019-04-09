<template>
  <div class="container">
    <mapBuildings :buildings="buildings"></mapBuildings>
    <listBuildings :buildings="buildings"></listBuildings>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import listBuildings from './listBuildings.vue'
import mapBuildings from './mapBuildings.vue'


export default {
  name: 'indexLocatee',
  components: {
    listBuildings,
    mapBuildings
  },

  data () {
    return {
      buildings: [],
      occupiedDesks: [],
      totalDesks: [],
    }
  },

  methods: {

  },

  mounted: function() {
    axios.all([
    axios.get('../static/data/peakOfOccupiedDesksPerBuilding.json'),
    axios.get('../static/data/buildings.json'),
    axios.get('../static/data/totalDesksPerBuilding.json')
    ])
    .then(axios.spread((occupiedDesks, buildings, totalDesks) => {
         this.occupiedDesks = occupiedDesks.data.stats;
         this.buildings = buildings.data.buildings;
         this.totalDesks = totalDesks.data.stats;
              let self = this
              self.buildings.map((building, index) => {
                  let totalDesks = self.totalDesks[index].value; // the index and id of Buildings.json and totalDesks.json coincide so we can get and set it directly through index
                  Vue.set(building, "totalDesks", totalDesks);
                  // In other hand Buildings.json id and occupiedDesks.json id don't coincide so we need to filter to find the proper id to attach the values
                  self.occupiedDesks.filter( desk => {
                    if(desk.building.id === building.id){
                    Vue.set(building, "occupiedDesks", desk.value);
                    };
                  });
              });
    }));
  }
}
</script>

<style scoped>


</style>
