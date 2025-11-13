export const state = () => ({
  dictionary: {},
});

export const mutations = {
  setDictionaryOrte(state, newDictionary) {
    state.dictionary = newDictionary;
  },
};
