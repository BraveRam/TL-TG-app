export const appReducer = (state, action)=>{
  switch(action.type){
    case "SET_DARK_MODE":
      return {
        ...state, theme: "dark"
      }
    case "SET_LIGHT_MODE":
      return {
        ...state, theme: "light"
      }
    case "SET_LANG":
      return {
        ...state, lang: action.payload.lang
      }
    case "DELETE_HISTORY":
      return {
        ...state, history: state.history.filter(item=>item.id !== action.payload)
      }
    case "SET_TEXT":
      return {
        ...state, text: action.payload
      }
    case "SET_PROCESS":
      return {
        ...state, processing: true,
      }
    case "UNSET_PROCESS":
      return {
        ...state, processing: false,
      }
    case "SET_TRANSLATED_TEXT":
      return {
        ...state, translatedText: action.payload
      }
    case "SET_HISTORY":
      return {
        ...state,
        history: [
          ...state.history.length >= 9 ? state.history.slice(1) : state.history,
          {
            id: Date.now(),
            lang: state.lang,
            to: action.payload.to,
            from: action.payload.from,
            date: new Date().toLocaleDateString()
          }
        ]
      };
    default:
      return state
  }
}