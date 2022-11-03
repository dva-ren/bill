export const categoryes = {
  food: {
    icon: 'shiwu',
    name: '餐饮',
  },
  life: {
    icon: 'shenghuojiaofei',
    name: '生活缴费',
  },
  shopping: {
    icon: 'gouwudai',
    name: '购物',
  },
  transport: {
    icon: 'jiaotongfei',
    name: '交通',
  },
  other: {
    icon: 'ico_e_advice',
    name: '其他',
  },
}

export interface Record {
  id: number
  type: 'expend' | 'income'
  amount: number
  date: string
  category: string
  remark?: string
}
export interface MultiUserRecord extends Record {
  personnel: string[]
}

export interface Person {
  id: string
  name: string
  amount: number
}
// export type BillType = 'income' | 'expense'
// export type Category = 'food' | 'transport' | 'other'
