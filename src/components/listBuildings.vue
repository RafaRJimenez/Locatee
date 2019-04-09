<template>
	<div class="container">
		<ul class="d-flex justify-content-center font-weight-bold">
			<li class="code">BUILDING</li>
			<li>SIZE</li>
			<li>USAGE</li>
			<li>CAPACITY</li>
		</ul>
		<ul class="d-flex justify-content-center font-weight-normal"  v-for="(building, index) in buildings ">
		 <li class="code">
   			 {{ building.code }}
  		</li>
  		<li>
  			{{building.totalDesks}}
  		</li>
  		<li>
  			{{Math.round(building.occupiedDesks * 100 / building.totalDesks) + '%'}}
  		</li>
  		<li>
  			{{building.totalDesks - building.occupiedDesks}}
  		</li>
		</ul>

	</div>
</template>

<script>
	export default {
		props: {
			buildings: Array
			}
	}

</script>

<style scoped>

.container {
	margin: 3rem 0 1rem 0;
}

ul li {
	list-style-type: none;
	display: inline-block;
	width: 4rem;
}

.code {
	width: 7rem;
}

ul {
	border: 1px solid black;
    align-items: center;
    padding: 0.2rem 0;
    margin: 0 auto;
    width: 22rem;
    border-radius: 5px;
}

</style>