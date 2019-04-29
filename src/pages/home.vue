<template>
  <div class="home">
    <!-- <Remainder class="mb-5"></Remainder> -->
    <PaymentInput></PaymentInput>
    <Activity></Activity>
    <PaymentUpdate></PaymentUpdate>

    <v-snackbar v-model="snackbar.show" :color="snackbar.type" bottom>
      {{ snackbar.text }}
      <v-btn @click="clearSnackbar" color="white" flat>閉じる</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Dexie from 'dexie'
import store from '@/utils/store'
import db from '@/utils/database'
import Activity from '@/containers/activity.vue'
import PaymentInput from '@/containers/payment-input.vue'
import PaymentUpdate from '@/containers/payment-update.vue'
import Remainder from '@/containers/remainder.vue'

export default Vue.extend({
  name: 'home',
  
  components: {
    Activity,
    PaymentInput,
    PaymentUpdate,
    // Remainder,
  },

  data() {
    return {
      snackbar: store.snackbar.state
    }
  },

  async created() {
    try {
      const logs = await db.log.toArray()
      store.logs.set(logs)
    } catch (error) {
      store.snackbar.set(error, 'error')
    }
  },

  methods: {
    clearSnackbar() {
      store.snackbar.clear()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
