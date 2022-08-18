import { defineStore } from 'pinia'
import type { MultiUserRecord, Person, Record } from '~/types'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      showNav: true,
      recordList: {
        usually: [] as Record[],
        multiUser: [] as MultiUserRecord[],
      },
      person: [] as Person[],
      setting: {
        user: {
          id: 'xxxx',
          name: 'xxxx',
          amount: 0,
        },
      },
    }
  },
  actions: {
    init() {
      const recordList = localStorage.getItem('recordList')
      const setting = localStorage.getItem('setting')
      if (recordList)
        this.$state.recordList = JSON.parse(recordList)
      if (setting)
        this.$state.setting = JSON.parse(setting)
      this.$state.person = JSON.parse(localStorage.getItem('person') || '[]')
    },
    addRecord(type: 'usually' | 'multiUser', record: Record | MultiUserRecord) {
      this.$state.recordList[type].push(record)
      localStorage.setItem('recordList', JSON.stringify(this.$state.recordList))
    },
    addPerson(person: Person) {
      this.$state.person.push(person)
      localStorage.setItem('person', JSON.stringify(this.$state.person))
    },
  },
})
