<template>
  <v-app>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 md3>
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
        </v-flex>
        <v-flex xs12 md9 class="bg-background">
          <div class="side-container2">
            <v-container>
              <v-layout row justify-space-around class="pa-8" v-if="daily && Array.isArray(daily)">
                <v-flex xs6 md2 v-for="weather in daily.slice(1, 6)" :key="weather.dt">
                  <div class="pa-4 card">
                    <p class="white--text ont-weight-medium title text-center">
                      {{ getDayFromUnix(weather.dt) }}
                    </p>
                    <img
                      v-if="weather.weather"
                      :src="`/img/${weather.weather[0].icon}.png`"
                      alt="weather icon"
                    />
                    <div class="pt-4">
                      <p class="white--text">
                        {{ weather.temp.min }}<span>&#8451;</span
                        ><span class="white--text ml-4"
                          >{{ weather.temp.max }}<span>&#8451;</span></span
                        >
                      </p>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container>
              <h1
                class="white--text display-2 text-left pl-8 pt-8"
                :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-2'"
              >
                Primo piano (oggi)
              </h1>
              <v-layout row justify-space-around class="pa-4 ml-3">
                <v-flex xs12 md6>
                  <div class="pa-3 card">
                    <p class="white--text font-weight-light title text-center">Condizione vento</p>
                    <p class="white--text display-2">
                      {{ getCurrentWindSpeed }}<span class="title">M/S</span>
                    </p>
                  </div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="pa-3 card">
                    <p class="white--text font-weight-light title text-center">Umidità</p>
                    <p class="white--text display-2">
                      {{ getCurrentHumidity }}<span class="title">%</span>
                    </p>
                  </div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="pa-3 card">
                    <p class="white--text font-weight-light title text-center">Visibilità</p>
                    <p class="white--text display-2">
                      {{ getCurrentVisibility }} <span class="title">Metri</span>
                    </p>
                  </div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="pa-3 card">
                    <p class="white--text font-weight-light title text-center">Pressione aria</p>
                    <p class="white--text display-2">
                      {{ getCurrentPressure }}<span class="title">hPa</span>
                    </p>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import moment from "moment";

moment.locale("it");
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    lat: 0,
    lon: 0,
    city: "",
    current: {},
    daily: {},
    failed_image: false
  }),
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
    },
    getDayFromUnix(unix) {
      return moment.unix(unix).calendar(null, {
        lastDay: "[Ieri]",
        sameDay: "[Oggi]",
        nextDay: "[Domani]",
        lastWeek: "[last] dddd",
        nextWeek: "dddd",
        sameElse: "L"
      });
    }
  },
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
.side-container {
  padding: 0;
  margin: 0;
  height: 101.7vh;
  background-color: #1e2139;
}

.side-container2 {
  /* height: 100vh; */
  background-color: #100e1c;
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

.card {
  background-color: #1d2038;
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card img {
  width: 4em !important;
  height: auto !important;
  margin: 0 auto;
}

.bg-background {
  background-color: #100e1c;
}
</style>
