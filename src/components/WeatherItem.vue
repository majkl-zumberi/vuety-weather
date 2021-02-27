<template>
  <div class="pa-4 card" v-if="weather != undefined">
    <p class="white--text font-weight-medium title text-center">
      {{ getDayFromUnix(weather.dt) }}
    </p>
    <img v-if="weather.weather" :src="fallbackIcon" v-on:error="onImgError" alt="weather icon" />
    <div class="pt-4">
      <p class="white--text">
        {{ weather.temp.min }}<span>&#8451;</span
        ><span class="white--text ml-4">{{ weather.temp.max }}<span>&#8451;</span></span>
      </p>
    </div>
  </div>
</template>
<script>
import moment from "moment";

moment.locale("it");
export default {
  name: "WeatherItem",
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      failed_image: false
    };
  },
  computed: {
    fallbackIcon() {
      return this.failed_image
        ? `${process.env.VUE_APP_WEATHERICON}${this.weather.weather[0].icon}${process.env.VUE_APP_SIZEICON}`
        : `/img/${this.weather.weather[0].icon}.png`;
    }
  },
  methods: {
    getDayFromUnix(unix) {
      return moment.unix(unix).calendar(null, {
        lastDay: "[Ieri]",
        sameDay: "[Oggi]",
        nextDay: "[Domani]",
        lastWeek: "[last] dddd",
        nextWeek: "dddd",
        sameElse: "L"
      });
    },
    onImgError() {
      this.failed_image = true;
    }
  }
};
</script>
<style scoped>
.card {
  background-color: #1d2038;
  margin: 0.5em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.card img {
  width: 4em !important;
  height: auto !important;
  margin: 0 auto;
}
</style>
