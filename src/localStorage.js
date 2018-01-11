//this file is not used, it is written for persisting store in the //localStorage, i might use redux-persist library



// export const loadState = () => {
//   try{
//     const serializedState = localStorage.getItem('state')
//     if(serializedState === null){
//       return undefined
//     }
//     return JSON.parse(serializedState)
//
//   } catch (err){
//     return undefined
//   }
// }
//
//
// export const saveState = (state) => {
//   try{
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch (err){
//
//   }
// }
