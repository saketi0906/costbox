export default interface Store {
  name: string
  keyPath: string,
  index: {
    name: string
    keyPath: string
    unique: boolean
  }[]
}