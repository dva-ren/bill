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
    addRecord(record: Record) {
      this.$state.recordList.usually.push(record)
      localStorage.setItem('recordList', JSON.stringify(this.$state.recordList))
    },
    addMultiUserRecord(record: MultiUserRecord) {
      this.$state.recordList.multiUser.push(record)
      const prise = record.amount / record.personnel.length
      record.personnel.forEach((p) => {
        const res = this.person.find(i => i === p)
        if (res)
          res.amount += prise
      })
      localStorage.setItem('recordList', JSON.stringify(this.$state.recordList))
      localStorage.setItem('person', JSON.stringify(this.$state.person))
    },
    addPerson(person: Person) {
      this.$state.person.push(person)
      localStorage.setItem('person', JSON.stringify(this.$state.person))
    },
    addNewPerson(name: string) {
      this.$state.person.push({
        id: Date.now().toString(),
        name,
        amount: 0,
      })
      localStorage.setItem('person', JSON.stringify(this.$state.person))
    },
    removePerson(person: Person) {
      this.$state.recordList.multiUser = this.$state.recordList.multiUser.filter(i => i.personnel.includes(person))
      this.person = this.person.filter(p => p.id !== person.id)
      // TODO: have bug
    },
  },
})
