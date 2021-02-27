<template>
  <v-container>
    <v-layout
      row
      justify-space-around
      align-baseline
      class="pa-8"
      v-if="daily && Array.isArray(daily)"
    >
      <v-flex xs6 md2 v-for="weather in daily.slice(1, 6)" :key="weather.dt">
        <WeatherItem :weather="weather" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import WeatherItem from "@/components/WeatherItem.vue";

export default {
  name: "WeatherList",
  components: { WeatherItem },
  props: {
    daily: {
      required: true,
      type: [Array, Object]
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>
