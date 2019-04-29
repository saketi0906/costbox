<template>
  <div>
    <h2 class="mb-2 title">{{ current.month }}月の残り予算</h2>

    <v-dialog ref="dialog" v-model="modal" persistent lazy full-width scrollable>
      <template slot="activator">
        <v-layout row justify-space-between>
          <p @click="modal = true" class="cost mt-0 mb-3 display-1">¥ {{ calculatedBudget }}</p>
          <v-btn flat icon color="secondary">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-layout>
      </template>
      
      <v-card>
        <v-card-title>月別の予算を設定</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout v-for="item in monthly" :key="item.month" row align-center class="mb-4">
            <v-flex xs3>
              <p class="mb-0">{{ item.month }}月</p>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="item.budget"
                v-money="money"
                @change="put(item.month, $event)"
                type="tel"
                maxlength="14"
                color="secondary"
                prefix="¥ "
                single-line
                hide-details
                class="input mt-0 pt-0"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="modal = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" flat @click="modal = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VMoney } from 'v-money'
import db from '@/utils/database'
import store from '@/utils/store'

interface Monthly {
  month: number,
  budget: number
}

export default Vue.extend({
  directives: {
    money : VMoney 
  },
  
  data() {
    return {
      modal: false,
      monthly: [] as Monthly[],
      current: {
        month: new Date().getMonth() + 1,
        monthBudget: 0
      },
      money: {
        thousands: ',',
        precision: 0,
        masked: false
      }
    }
  },

  async created() {
    const result = await db.monthly.toArray()
    if (result.length === 0) {
      for (let index = 1; index <= 12; index++) {
        await db.monthly.put({ month: index, budget: 0 })
      }
    }
    this.monthly = result

    const currentMonth = this.monthly.find(item => item.month === this.current.month)
    this.current.monthBudget = (currentMonth as Monthly).budget
  },

  computed: {
    calculatedBudget(): string {
      return this.current.monthBudget.toLocaleString()
    },
    // remainder(): string  {
    //   if (this.logs.data.length !== 0) {
    //     const costs = this.logs.data.map(log => Number(log.cost.replace(/,/g, '')))
    //     const sumResult = this.sum(costs)
    //     return String(this.budget - sumResult)
    //   } else {
    //     return ''
    //   }
    // }
  },

  methods: {
    sum(array: number[]) {
      return array.reduce((total, current) => total + current)
    },
    put(monthVal: number, budget: string) {
      this.monthly.forEach(item => {
        if (item.month === monthVal) {
          item.budget = Number(budget.replace(/,/g, ''))
          this.current.monthBudget = item.budget
          db.monthly.put({ month: monthVal, budget: item.budget })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.input /deep/ .v-text-field__prefix {
  margin-top: 0 !important;
}
</style>

