<template>
  <div class="container">
    <h4>LOCATEE BUILDING'S MAP</h4>
<mapBuildings :buildings="buildings"></mapBuildings>
<list :buildings="buildings"></list>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import List from './list.vue'
import mapBuildings from './mapBuildings.vue'


export default {
  name: 'indexLocatee',
  components: {
    List,
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
                let totalDesks = self.totalDesks[index].value; // the index and id of Buildings.json and totalDesks.json coincide so we can get and set it directily through index
                Vue.set(building, "totalDesks", totalDesks);
                // In other hand Buildings.json id and occupiedDesks.json donn't coincide so we need to filter to find the proper id to attach the values
                self.occupiedDesks.filter( desk => {
                  if(desk.building.id === building.id){
                  Vue.set(building, "occupiedDesks", desk.value);
                    };
                 });
            });
        console.log(this.buildings)
  }));


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.h1 {
  margin: 1rem auto;
}

</style>
