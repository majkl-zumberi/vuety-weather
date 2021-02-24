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
                  <v-img src="http://openweathermap.org/img/wn/10d@2x.png"></v-img>
                </v-row>
              </div>
            </div>
            <div
              class="d-flex flex-column
             align-center justify-space-around align-content-space-between"
            >
              <h2 class="text-h1 white--text font-weight-medium">
                15<span class="display-1">&#8451;</span>
              </h2>
              <p class="blue-grey--text text--lighten-2 font-weight-medium display-1">Shower</p>
              <div>
                <span class="body-1 grey--text font-weight-regular ">Today</span>
                <span class="body-1 grey--text font-weight-regular px-2">•</span>
                <span class="body-1 grey--text font-weight-regular ">Fri 5 jun</span>
                <div>
                  <p class="body-1 grey--text font-weight-regular text-center">
                    <span><v-icon color="grey">location_on</v-icon></span> italy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 md9>
          <div class="side-container2">
            <p>weila</p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false
  })
};
</script>
<style>
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
  height: 100vh;
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
</style>
