<template>
  <v-navigation-drawer
    v-model="drawer"
    dark
    absolute
    color="#181b2e"
    :width="$vuetify.breakpoint.xs ? '100%' : $vuetify.breakpoint.sm ? '100%' : '25%'"
    temporary
  >
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn icon color="white" class="mt-4 mr-4" @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </div>
    <div class="px-4">
      <div class="d-flex align-start">
        <v-text-field
          class="mr-2"
          prepend-inner-icon="search"
          label="inserisci città"
          outlined
          v-model="search"
        ></v-text-field>
        <v-btn color="#3a48e5" class="py-6 mt-1" @click="searchCity()">
          Cerca
        </v-btn>
      </div>
      <v-list nav dense>
        <v-list-item-group active-class="blue--text text--accent-4">
          <v-list-item v-for="city in defaultCities" :key="city.label">
            <v-list-item-title @click="selectCity({ ...city })">{{ city.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
<script>
import eventBus from "@/utils/eventBus";

export default {
  name: "Drawer",
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      search: "",
      defaultCities: [
        {
          label: "Bergamo",
          lat: "45.69331",
          lon: "9.663539"
        },
        {
          label: "Milano",
          lat: "45.473702",
          lon: "9.170685"
        },
        {
          label: "Londra",
          lat: "51.509648",
          lon: "-0.099076"
        }
      ]
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    selectCity({ label, lat, lon }) {
      eventBus.$emit("city-changed", { city: label, lat, lon });
      this.close();
    },
    searchCity() {
      eventBus.$emit("search-city", this.search);
      this.close();
    }
  }
};
</script>
<style></style>
