import Dexie from 'dexie'

interface Log {
  id?: number,
  date: string,
  cost: string
}
interface Monthly {
  month: number,
  budget: number
}
class DexieWrapper extends Dexie {
  log: Dexie.Table<Log, number>
  monthly: Dexie.Table<Monthly, number>
  constructor (databaseName: string) {
    super(databaseName);
  }
}

const db = new DexieWrapper('budget')
db.version(1).stores({
  log: '++id, date, cost',
  monthly: 'month, budget'
})

export default db