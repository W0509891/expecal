export interface Transaction {
  id: number
  date?: string
  transaction?: string
  description?: string
  account_id: number
  type: string
  amount: number
  balance: number
  currency: string
}
