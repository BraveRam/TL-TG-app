import { Router } from "./Routes/Routes";
import { Navbar } from "./Components/Navbar";
import { AppProvider } from "./Contexts/AppContext";
import { useTgContext } from "./Contexts/TgContext";

function App(){
  const { state, dispatch } = useTgContext();
  if(state.isInitialized){
    if(state.hasAccess){
      return (
         <AppProvider>
           <Navbar/>
           <Router/>
         </AppProvider>
  )
    } else{
      return (
        <>
        {/*state.TG?.showAlert("Join the channel")*/}
        <h1 className="">Join Channel</h1>
        </>
        )
    }
  } else{
    return <h1 className="text-center text-2xl mt-5 font-extrabold text-red-500">Open the bot in Telegram</h1>
  }
}

export default App;
