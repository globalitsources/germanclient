<template lang="">
  <div>

      <h2 class="for-cities">Alle Städte:</h2>

      <div ref="cities" class="cities">
          <ul class="chars-out">
                <li v-for="row in cities" class="chars">
                  <a v-if="row.cities.length" @click="toggleElement(row.char)" :id="'togg_'+row.char" class="togg">{{ row.char }}</a>
                  <span v-else>
                   {{ row.char }}
                  </span>
                </li>
          </ul>
      </div>






      <div ref="cities">


        <template v-for="crow in cities">

          <div :id="crow.char" class="cities-out">

                  <template v-for="ccity in crow.cities">
                      <a :href="'/monteurzimmer/'+ccity.toLowerCase()+'/'" class="end_city"> &nbsp;{{ccity}} </a>
                  </template>

          </div>

        </template>

      </div>

  </div>
</template>


<style>
div.cities-out {
  display:none;
}
h2.for-cities {
  font-weight: bold;
  margin: 2rem 0 -1rem 0;
}
div.cities {
  margin:2rem auto;
  text-align:center;
  background-color: #c5003e;
  padding:10px 0 0 0;
}
ul.chars-out {
  display:inline-block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #c5003e;
}
li.chars {
  float: left;
}
li.chars span {
  display: block;
  color: gray;
  text-align: center;
  padding: 14px;
  font-weight: bold;
}
li.chars a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  cursor:pointer;
  font-weight: bold;
}
li.chars a:hover {
  text-decoration:underline;
  text-underline-offset: 4px;
}
li.chars a.active {
  text-decoration:underline;
  text-underline-offset: 4px;
}
a.end_city {
  color: #ffb536;
  font-weight: bold;
  margin:2px 8px;
}
a.end_city:hover {
  text-decoration:underline;
}
</style>

<script>
import getCitiesAz from "~/utils/getCitiesAz";

export default {
  name: "EstateCitiesAz",
  data() {
    return {
      city: '',
      cities: [],
    };
  },
  async fetch() {
    let res = await getCitiesAz();
    this.cities = res.data.data;
  },
  methods: {
    toggleElement(id) {
      let togg_el = document.getElementById('togg_'+id);
      let togg_els = document.getElementsByClassName("togg");
      for (let i = 0; i < togg_els.length; i++) {
        togg_els[i].classList.remove("active");
      }
      togg_el.classList.add("active");
      let el = document.getElementById(id);
      let els = document.getElementsByClassName("cities-out");
      for (let i = 0; i < els.length; i++) {
        els[i].style.display = 'none';
      }
      el.style.display = 'block';
    }
  }
};
</script>

