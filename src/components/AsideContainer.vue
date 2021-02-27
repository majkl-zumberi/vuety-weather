<template>
  <div class="side-container">
    <v-row class="pa-8" align="center" justify="space-around">
      <v-btn depressed small class="font-weight-regular" @click.stop="drawer = !drawer">
        Cerca località</v-btn
      >
      <v-btn depressed fab small>
        <v-icon>gps_fixed</v-icon>
      </v-btn>
    </v-row>
    <div class="current-weather-bg-wrapper">
      <div id="weather">
        <v-row align="center" justify="center">
          <img
            v-if="current.weather"
            :src="fallbackIcon"
            v-on:error="onImgError"
            alt="weather icon"
          />
        </v-row>
      </div>
    </div>
    <div
      class="d-flex flex-column
             align-center justify-space-around align-content-space-between"
    >
      <h2 class="text-h2 white--text font-weight-medium">
        {{ getCurrentTemp }}<span class="display-1">&#8451;</span>
      </h2>
      <p
        v-if="current.weather"
        class="blue-grey--text text--lighten-2 font-weight-medium display-1"
      >
        {{ getCurrentWeatherDesc }}
      </p>
      <div>
        <span class="body-1 grey--text font-weight-regular ">{{ currentTime }}</span>
        <span class="body-1 grey--text font-weight-regular px-2">•</span>
        <span class="body-1 grey--text font-weight-regular ">{{ getDate }}</span>
        <div>
          <p class="body-1 grey--text font-weight-regular text-center">
            <span><v-icon color="grey">location_on</v-icon></span> {{ city }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

moment.locale("it");
export default {
  name: "AsideContainer",
  props: {
    current: {
      required: true,
      type: Object
    },
    city: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      drawer: false,
      failed_image: false
    };
  },
  computed: {
    currentTime() {
      return moment.unix(this.current.dt).calendar(null, {
        lastDay: "[Ieri]",
        sameDay: "[Oggi]",
        nextDay: "[Domani]",
        lastWeek: "[last] dddd",
        nextWeek: "dddd",
        sameElse: "L"
      });
    },
    getDate() {
      return moment.unix(this.current.dt).format("LL");
    },
    getCurrentWeatherDesc() {
      return this.current.weather[0].description;
    },
    getCurrentTemp() {
      return this.current.temp;
    },
    fallbackIcon() {
      return this.failed_image
        ? `${process.env.VUE_APP_WEATHERICON}${this.current.weather[0].icon}${process.env.VUE_APP_SIZEICON}`
        : `/img/${this.current.weather[0].icon}.png`;
    }
  },
  methods: {
    onImgError() {
      this.failed_image = true;
    }
  }
};
</script>
<style>
.side-container {
  padding: 0;
  margin: 0;
  height: 101.7vh;
  background-color: #1e2139;
}
.current-weather-bg-wrapper {
  position: relative;
  height: 45vh;
  overflow: hidden;
}

.current-weather-bg-wrapper #weather {
  padding: 50px;
  position: relative;
  z-index: 2;
}
/* You could use :after - it doesn't really matter */
.current-weather-bg-wrapper:before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  background-image: url("/img/Cloud-background.png");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
</style>
