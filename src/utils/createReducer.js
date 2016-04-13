export function createReducer (initialState, fnMap) {
  return (state = initialState, action, ...rest) => {
    const { type } = action
    const handler = fnMap[type]

    return handler ? handler(state, action, ...rest) : state
  }
}

export default createReducer
