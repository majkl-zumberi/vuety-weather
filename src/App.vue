<template>
  <v-app>
    <v-container fluid>
      <v-layout row class="bg-background">
        <v-flex xs12 md3>
          <AsideContainer :current="current" :city="city" />
        </v-flex>
        <v-flex xs12 md9 class="bg-background">
          <main-container :current="current" :daily="daily" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import AsideContainer from "@/components/AsideContainer.vue";
import MainContainer from "@/components/MainContainer.vue";

export default {
  name: "App",

  components: { AsideContainer, MainContainer },

  data: () => ({
    lat: 0,
    lon: 0,
    city: "",
    current: {},
    daily: {}
  }),
  async created() {
    const { data } = await this.$axios.get("http://ip-api.com/json");
    const { city, country, lat, lon } = data;
    this.city = `${city}, ${country}`;
    this.lat = lat;
    this.lon = lon;

    const { data: weatherData } = await this.$axios.get(
      `data/2.5/onecall?lat=${this.lat}&lon=${lon}`
    );
    this.current = { ...weatherData.current };
    this.daily = weatherData.daily;
  }
};
</script>
<style>
body {
  background-color: #100e1c;
}
div .d-flex {
  height: 39vh;
}

.bg-background {
  background-color: #100e1c;
}
</style>
