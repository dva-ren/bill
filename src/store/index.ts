import { defineStore } from 'pinia'
import type { MultiUserRecord, Record } from '~/types'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      showNav: true,
      recordList: {
        usually: [] as Record[],
        multiUser: [] as MultiUserRecord[],
      },
    }
  },
  actions: {
    init() {
      const recordList = localStorage.getItem('recordList')
      if (recordList)
        this.$state.recordList = JSON.parse(recordList)
    },
    addRecord(type: 'usually' | 'multiUser', record: Record | MultiUserRecord) {
      this.$state.recordList[type].push(record)
      localStorage.setItem('recordList', JSON.stringify(this.$state.recordList))
    },
  },
})
