const types = {
  UPDATE_POSITION: 'UPDATE_POSITION'
}

const state = {
  positions: {}
}
const actions = {
  updateScrollPosition: ({ commit }, positionInfo) => {
    commit(types.UPDATE_POSITION, positionInfo)
  }
}

const mutations = {
  [types.UPDATE_POSITION] (state, positionInfo) {
    state.positions[positionInfo.name] = positionInfo.position
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
