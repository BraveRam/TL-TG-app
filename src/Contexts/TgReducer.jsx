export const tgReducer = (state, action)=>{
  switch(action.type){
    case "DISPATCH_TG":
      return {
        ...state,
        TG: action.payload
      }
    case "ENABLE_ACCESS":
      return {
        ...state, hasAccess: true
      }
    case "DISABLE_ACCESS":
      return {
        ...state, hasAccess: false
      }
    case "SET_IS_INITIALIZED":
      return {
        ...state, isInitialized: true
      }
    case "UNSET_IS_INITIALIZED":
      return {
        ...state, isInitialized: false
      }
  }
}