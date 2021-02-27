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
import eventBus from "@/utils/eventBus";

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
  methods: {
    async getCityWeather({ city, lat, lon }) {
      this.city = city;

      const { data: weatherData } = await this.$axios.get(`data/2.5/onecall?lat=${lat}&lon=${lon}`);
      this.current = { ...weatherData.current };
      this.daily = weatherData.daily;
    },
    async searchCity(city) {
      try {
        const { data } = await this.$axios(
          `${process.env.VUE_APP_POSITIONSTACK_BASEURL}?access_key=${process.env.VUE_APP_POSITIONSTACK_APIKEY}&query=${city}`
        );

        if (Array.isArray(data.data) && data.data.length > 1) {
          /**
           * es: inserisco budapest (ungheria? usa? ecc.)
           * ho trovato più risultati per quella città
           */

          this.$dialog.notify.error(`più occorrenze trovate per ${city}, sii più specifico`, {
            position: "top-right",
            timeout: 5000
          });
        } else {
          const location = {
            city: `${data.data[0].name}, ${data.data[0].country}`,
            lat: data.data[0].latitude,
            lon: data.data[0].longitude
          };
          this.getCityWeather({ ...location });
        }
      } catch (error) {
        this.$dialog.notify.error(`nessuna occorrenza per ${city}`, {
          position: "top-right",
          timeout: 3000
        });
      }
    },
    async getCurrentLocation() {
      const { data } = await this.$axios.get(`${process.env.VUE_APP_LOCATION}`);
      const location = { city: data.city, lat: data.lat, lon: data.lon };
      this.getCityWeather({ ...location });
    }
  },
  async created() {
    const { data } = await this.$axios.get(`${process.env.VUE_APP_LOCATION}`);
    const { city, country, lat, lon } = data;
    this.city = `${city}, ${country}`;
    this.lat = lat;
    this.lon = lon;

    const { data: weatherData } = await this.$axios.get(
      `data/2.5/onecall?lat=${this.lat}&lon=${lon}`
    );
    this.current = { ...weatherData.current };
    this.daily = weatherData.daily;

    eventBus.$on("city-changed", this.getCityWeather);
    eventBus.$on("search-city", this.searchCity);
    eventBus.$on("current-location", this.getCurrentLocation);
  },
  beforeDestroy() {
    eventBus.$off("city-changed", this.getCityWeather);
    eventBus.$off("search-city", this.searchCity);
    eventBus.$off("current-location", this.getCurrentLocation);
  }
};
</script>
<style>
body {
  background-color: #100e1c;
}

.bg-background {
  background-color: #100e1c;
}
</style>
