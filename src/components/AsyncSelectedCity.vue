<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary text-center w-full"
    >
      <p>
        you are currently viewing the city, please add the city to your list to
        be able to track the city
      </p>
    </div>
    <!-- Weather OverView  -->
    <div class="flex flex-col items-center text-white py-12">
        <h1 class="text-4 mb-2">{{ route.params.city }}</h1>
        <p class="text-sm mb-12"></p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { errorMessages } from "vue/compiler-sfc";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `api.openweathermap.org/data/2.5/forecast/daily?lat=${route.query.latitude}&lon=${router.query.longitude}&cnt={cnt}&appid=482944260320a80b5е42363de7d1t&units=imperial`
    );

    /*
    to account for time difference between the cities 
    the following calculations are implemented 
    */

    //calculates the current date and time diff
    const localOffset = new Date().getTimezoneOffset() * 6000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    //calculates the hourly offset
    weatherData.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (errorMessages) {
    errorMessages;
  }
};

const weatherData = getWeatherData();

const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updateCities = cities.filter((city) => city.id !== router.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updateCities));
  router.push({
    name: "home-page",
  });
};
</script>