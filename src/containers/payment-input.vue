<template>
  <div class="activity">
    <h2 class="mb-3 title">支払いの登録</h2>
    <Cost v-model="cost"></Cost>
    <Calendar v-model="date" class="mb-4"></Calendar>
    <v-btn :disabled="cost === '0'" @click="put" color="secondary" block large class="mx-0 mb-5">登録する</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/utils/store'
import db from '@/utils/database'
import Cost from '@/components/cost.vue'
import Calendar from '@/components/calendar.vue'

export default Vue.extend({
  name: 'PaymentInput',

  components: {
    Cost,
    Calendar
  },
  
  data() {
    return {
      cost: '',
      date: new Date().toISOString().substr(0, 10),
      timeStamp: Date.now(),
      refresh: false
    }
  },

  methods: {
    async put() {
      try {
        await db.log.put({ cost: this.cost, date: this.date })
        const logs = await db.log.toArray()
        store.logs.set(logs)
        store.snackbar.set('支払い情報を登録しました', 'success')
        this.cost = ''
      } catch {
        store.snackbar.set('登録に失敗しました', 'error')
      }
    }
  }
})
</script>
