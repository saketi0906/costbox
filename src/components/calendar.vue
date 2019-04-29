<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    persistent
    lazy
    full-width
    width="512"
  >
    <template slot="activator">
      <v-text-field
        v-model="date"
        label="日付"
        append-icon="event"
        box
        hide-details
        readonly
      ></v-text-field>
    </template>
    
    <v-date-picker 
      v-model="date"
      :day-format="date => new Date(date).getDate()"
      locale="ja-ja"
      scrollable
      full-width
    >
      <v-spacer></v-spacer>
      <v-btn @click="modal = false" color="primary" flat>キャンセル</v-btn>
      <v-btn @click="$refs.dialog.save(date)" color="primary" flat>完了</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/utils/store'
export default Vue.extend({
  props: {
    value: String
  },

  data() {
    return {
      modal: false
    }
  },

  computed: {
    date: {
      get(): string {
        return this.value
      },
      set(value: string) {
        this.$emit('input', value)
      }
    }
  }
})
</script>
