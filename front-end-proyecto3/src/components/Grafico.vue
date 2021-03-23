<template>
  <v-sparkline
    style="margin:10px;"
    :labels="labels"
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    color="#363636"
    auto-draw
  ></v-sparkline>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["blue", "black", "blue"],
  ["purple", "violet"],
  ["#00c6ff", "#00c6ff", "#00c6ff"],
  ["#00c6ff", "#004F89", "#00c6ff"],
];
export default {
  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    labels: ["DAW", "DAM", "ASIX", "SMX"],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
  }),
  props:["value"]
};
</script>