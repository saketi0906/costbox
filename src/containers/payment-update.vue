<template>
  <v-dialog
    v-model="update.show"
    width="512"
  >
    <div class="dialog">
      <v-card>
        <v-card-title primary-title>
          <h2 class="title">{{ updatedObj.date }}の支出</h2>
        </v-card-title>

        <v-card-text v-if="update.show">
          <Cost v-model="updatedObj.cost"></Cost>
          <Calendar v-model="updatedObj.date"></Calendar>
        </v-card-text>

        <v-card-actions class="px-3">
          <v-spacer></v-spacer>
          <v-btn @click="cancel" flat>キャンセル</v-btn>
          <v-btn :disabled="updatedObj.cost === '0'" @click="change" flat color="secondary">更新する</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
type Prop<T> = () => T

import Vue from 'vue'
import store from '@/utils/store'
import db from '@/utils/database'
import Cost from '@/components/cost.vue'
import Calendar from '@/components/calendar.vue'

export default Vue.extend({
  name: 'PaymentUpdate',

  components: {
    Calendar,
    Cost
  },
  
  data() {
    return {
      update: store.update.state,
      localCost: '',
      localDate: '',
      updatedObj: {
        id: 0,
        cost: '',
        date: ''
      }
    }
  },
  
  watch: {
    // 'update.show'() {
    //   const updatedObj = store.update.getUpdatedObj()
    //   this.updatedObj._id = updatedObj.id
    //   this.updatedObj._cost = updatedObj.cost
    //   this.updatedObj._date = updatedObj.date
    // },
    'update.updatedObj'(obj) {
      this.updatedObj = obj
    }
  },

  methods: {
    async change() {
      await db.log.put(this.updatedObj)
      try {
        store.snackbar.set('データを更新しました', 'success')
        // this.refreshLog()
        this.cancel()
      } catch {
        store.snackbar.set('データの更新に失敗しました', 'error')
      }
      // const id = store.update.getUpdatedObj().id
      // try {
      //   await this.db.open()
      //   const result = await this.db.change('book', this.updatedObj._id, {
      //     cost: this.updatedObj._cost,
      //     date: this.updatedObj._date
      //   })
      //   store.snackbar.set(result, 'success')
      //   this.refreshLog()
      //   this.$emit('cancel')
      // }
      // catch (error) {
      //   store.snackbar.set(error, 'error')
      // }
    },
    async refreshLog() {
      // const logs = await this.db.getAll('book')
      // store.logs.set(logs)
    },
    cancel() {
      store.sheet.hide()
      store.update.hide()
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  background-image: linear-gradient(120deg, #FFCA28, adjust-hue(#FFCA28, 15%)) !important;
}

.cost /deep/ {
  .v-input__prepend-inner {
    align-self: center;
    padding-right: 1rem;
    font-size: .8em;
  }
  .v-text-field__prefix {
    max-height: none;
  }
  .v-icon {
    font-size: .8em;
  }
  input {
    max-height: initial;
  }
}
</style>
