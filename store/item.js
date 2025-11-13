export const state = () => ({
  itemId: '',
});

export const mutations = {
  changeItem(state, newItemId) {
    state.itemId = newItemId;
  },
};
