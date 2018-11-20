export function createStore (reducer) {
  // 内部state
  let state
  // 内部保存n个listener的数组
  const listencers = []


  // 初始化reducer,且保存
  state = reducer(state, {type: '@szp-redux-init'})

  function getState () {
    return state
  }

  function dispatch (action) {
    // 调用reducer. 得到新state保存
    state = reducer(state, action)

    // 调用listencer所有的监听回调函数
    listencers.forEach(listencer => listencer())
  }

  // 绑定一个state监听器
  function subscribe (listencer) {
    listencers.push(listencer)
  }

  return {getState, dispatch, subscribe}
}


/**
 * 
 * @param {reducers} reducers 包含多个reducer函数的对象
 * @return {reduce} 包含整合后的新状态
 */
// export function combinReducers (reducers) {

//   return function (state={}, action) {
//     const newState = {}
//     const keys = Object.keys(reducers)
//     keys.forEach(key => {
//       const childReducer = reducers[key]
//       const childState = state[key]
//       const newChildState = childReducer(childState, action)
//       newState[key] = newChildState
//     })
//     return newState
//   }
// }

/**
 * 
 * @param {reducers} reducers 包含多个子reducer函数的对象
 * @return {reduce} 包含整合后的新状态
 */
export function combinReducers (reducers) {
  return function (state={}, action) {
    return Object.keys(reducers).reduce((newState, key) => {
      newState[key] = reducers[key](state[key], action)
      return newState
    }, {})
  }
}