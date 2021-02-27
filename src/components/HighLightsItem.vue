<template>
  <div class="pa-3 card">
    <p class="white--text font-weight-light title text-center">{{ highlight.label }}</p>
    <p class="white--text display-2">
      {{ highlight.valFn() }}<span class="title">{{ highlight.measureUnit }}</span>
    </p>
  </div>
</template>
<script>
export default {
  name: "highlightsItem",
  props: {
    highlight: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
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
</style>
