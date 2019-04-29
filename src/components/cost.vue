<template>
  <v-text-field
    v-if="!refresh"
    v-model="cost"
    v-money="money"
    label="金額"
    prefix="¥ "
    type="tel"
    maxlength="14"
    color="secondary"
    box
    hide-details
    class="cost mt-0 mb-3 display-1"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { VMoney } from 'v-money'

export default Vue.extend({
  name: 'Cost',

  directives: {
    money : VMoney 
  },

  props: {
    value: String
  },

  data() {
    return {
      refresh: false,
      money: {
        thousands: ',',
        precision: 0,
        masked: false
      }
    }
  },

  computed: {
    cost: {
      get(): string {
        return this.value
      },
      set(value: string) {
        this.$emit('input', value ? value : '0')
      }
    }
  },

  watch: {
    cost(value: string) {
      if (value === '') {
        this.refresh = true
        setTimeout(() => this.refresh = false, 0)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
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
