<template>
  <div class="side-container2">
    <WeatherList :daily="daily" />
    <v-container>
      <h1
        class="white--text display-2 text-left pl-8 pt-8"
        :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-2'"
      >
        Primo piano (oggi)
      </h1>
      <HighLightsList :highlights="highlights" />
    </v-container>
  </div>
</template>
<script>
import moment from "moment";
import WeatherList from "@/components/WeatherList.vue";
import HighLightsList from "@/components/HighLightsList.vue";

moment.locale("it");
export default {
  name: "MainContainer",
  components: { WeatherList, HighLightsList },
  props: {
    current: {
      required: true,
      type: Object
    },
    daily: {
      required: true,
      type: [Array, Object]
    }
  },
  data() {
    return {
      highlights: [
        {
          label: "Condizione vento",
          measureUnit: "M/S",
          valFn: () => this.getCurrentWindSpeed
        },
        {
          label: "Umidità",
          measureUnit: "%",
          valFn: () => this.getCurrentHumidity
        },
        {
          label: "Visibilità",
          measureUnit: "Metri",
          valFn: () => this.getCurrentVisibility
        },
        {
          label: "Pressione aria",
          measureUnit: "hPa",
          valFn: () => this.getCurrentPressure
        }
      ]
    };
  },
  computed: {
    getCurrentHumidity() {
      return this.current.humidity;
    },
    getCurrentVisibility() {
      return this.current.visibility;
    },
    getCurrentWindSpeed() {
      return this.current.wind_speed;
    },
    getCurrentPressure() {
      return this.current.pressure;
    }
  }
};
</script>
<style>
.side-container2 {
  background-color: #100e1c;
}
</style>
