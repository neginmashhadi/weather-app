<template>
  <!-- Search City Component -->
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus: outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        placeholder="Search for a city"
        name=""
        id=""
      />
      <ul
        v-if="mapboxSearchResult"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Something went wrong, please try again!</p>
        <p v-if="!serverError && mapboxSearchResult.length === 0">
          No results found, please try a different location.
        </p>

        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResult"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="selectedCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const mapboxApiKey =
  "pk.eyJ1Ijoibm1hc2hoYWRpIiwiYSI6ImNsdWQ0emo1dzAzMzQybm80NHdxdnltZWoifQ.3gc9UZY5TqStOTEbXFZyMA";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResult = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`
        );
        mapboxSearchResult.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResult.value.value = null;
  }, 300);
};
const router = useRouter();
const selectedCity = (searchResult) => {
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "selectedCity", //path namme
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      latitude : searchResult.geometry.coordinates[1],
      longitude: searchResult.geometry.coordinates[0],
      preview: true,
    }
  });
};


</script>

