export const categoryes = {
  food: {
    icon: '',
  },
  shopping: {
    icon: 'i-carbon-shopping-catalog',
    name: '购物',
  },
  transport: {
    icon: 'i-carbon-bus',
    name: '交通',
  },

}

export interface BillItem {
  id: number
  type: string
  amount: number
  date: string
  category: string
  description?: string
}

// export type BillType = 'income' | 'expense'
// export type Category = 'food' | 'transport' | 'other'
