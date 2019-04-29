<template>
  <div class="activity">
    <h2 class="mb-3 title">支払い履歴</h2>
    <hr class="v-divider theme--light">
    <v-list v-if="logs.data.length !== 0" two-line class="transparent py-0">
      <transition-group name="list" mode="out-in">
        <div v-for="log in logs.data" :key="log.id" style="transition: 1s">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>¥ {{ log.cost }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ log.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="setEditObj(log)" icon ripple>
                <v-icon color="grey darken-2">more_vert</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </div>
      </transition-group>
    </v-list>
    <p v-else class="mt-3">データがありません。</p>

    <v-bottom-sheet v-model="sheet.show" inset max-width="512">
      <v-list>
        <v-list-tile @click="update">
          <v-list-tile-title>更新する</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="dbDelete">
          <v-list-tile-title>削除する</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="cancel">
          <v-list-tile-title>キャンセル</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/utils/store'
import { Log } from '@/utils/interface'
import db from '@/utils/database'

export default Vue.extend({
  name: 'Activity',

  data() {
    return {
      logs: store.logs.state,
      sheet: store.sheet.state,
      editObj: {
        id: 0,
        cost: "",
        date: ""
      }
    }
  },

  methods: {
    setEditObj(log: Log) {
      store.sheet.show()
      this.editObj = log
    },
    update() {
      store.update.show()
      store.update.setLog(this.editObj)
      store.sheet.hide()
    },
    async dbDelete() {
      try {
        await db.log.delete(this.editObj.id)
        store.snackbar.set('データを削除しました', 'success')
        const logs = await db.log.toArray()
        store.logs.set(logs)
        this.cancel()
      } catch {
        store.snackbar.set('データの削除に失敗しました', 'error')
      }
      store.sheet.hide()  
    },
    cancel() {
      store.sheet.hide()
    }
  }
})
</script>

<style lang="scss" scoped>
.list-enter, .list-leave-to {
  opacity: 0;
  transform: scale(.95);
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: transform 1s;
}
</style>
