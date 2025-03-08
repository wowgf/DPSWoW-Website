import axios from 'axios';
import { defineStore } from 'pinia'
import type { Spec } from '~/types/wowdata';

export const useJsonDataStore = defineStore('jsonData', () => {

  let sourceList: any[] = [
    'spec'
  ]

  let data = reactive<{
    spec: Spec[]
  }>({
    spec: []
  })


  function init() {
    sourceList.forEach(item => {
      axios.get(`/wow/data/${item}.json`).then(res => {
        data[item] = res.data
      })
    })
  }

  return {
    init,
    data
  }
})

