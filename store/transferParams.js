export const state = () => ({
    objectClicked: ""
 })
 
 export const mutations = {
     setObjectClicked(state, newObjectClicked){
         state.objectClicked = newObjectClicked
     }
 }