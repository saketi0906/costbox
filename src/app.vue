<template>
  <v-app id="inspire" class="app transparent">
    <!-- <v-navigation-drawer v-model="drawer" fixed>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>このアプリについて</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

    <v-toolbar flat class="mb-2 transparent">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>CostBox</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container class="container">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {  
    return {
      drawer: null
    }
  }
})
</script>


<style lang="scss">
@import '~vuetify/dist/vuetify.min.css';

.app {
  font-family: "Noto Sans JP";
  background-image: linear-gradient(120deg, #FFCA28, adjust-hue(#FFCA28, 15%)) !important;
}
.display-2, .display-3,
.display-1, .headline,
.title {
  font-family: "Noto Sans JP" !important;
}

.container {
  max-width: 40rem;
  margin: auto;
}
</style>
