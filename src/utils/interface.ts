interface Log {
  id?: number,
  date: string,
  cost: string
}

interface Monthly {
  month: number,
  budget: number
}

export { Log, Monthly }