<template>
  <v-layout row justify-space-around class="pa-4 ml-3">
    <v-flex xs12 md6 v-for="highlight in highlights" :key="highlight.label">
      <highlightsItem :highlight="highlight" />
    </v-flex>
  </v-layout>
</template>
<script>
import highlightsItem from "./HighLightsItem.vue";

export default {
  name: "HighlightsList",
  components: { highlightsItem },
  props: {
    highlights: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>
