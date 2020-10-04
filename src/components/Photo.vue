<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- <div v-for="photo in photos" :key="photo.name">{{ photo }}</div> -->
        <!-- <v-img
          :src="require('../assets/logo.svg')"
          class="m-2"
          contain
          height="200"
        /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Photos",

  created () {
    this.$store.dispatch("fetchImages", this.page);
  },

  computed: {
    photos () { return this.$store.images; }
  },

  data: () => ({
    page: 1
  })
};
</script>
