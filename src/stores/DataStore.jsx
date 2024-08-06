import { makeAutoObservable } from "mobx"

export function createDataStore() {
  return makeAutoObservable({

    setView: null,
    setMap: null,
  })
}
