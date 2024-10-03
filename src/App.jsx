import { Router } from "./Routes/Routes";
import { Navbar } from "./Components/Navbar";
import { AppProvider } from "./Contexts/AppContext";
import { useTgContext } from "./Contexts/TgContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const { state, dispatch } = useTgContext();
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="animate-spin text-white">
        <svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#e8eaed"><path d="M196-331q-20-36-28-72.5t-8-74.5q0-131 94.5-225.5T480-798h43l-80-80 39-39 149 149-149 149-40-40 79-79h-41q-107 0-183.5 76.5T220-478q0 29 5.5 55t13.5 49l-43 43ZM476-40 327-189l149-149 39 39-80 80h45q107 0 183.5-76.5T740-479q0-29-5-55t-15-49l43-43q20 36 28.5 72.5T800-479q0 131-94.5 225.5T480-159h-45l80 80-39 39Z"/></svg>
      </h1>
    </div>
  }

  if (state.isInitialized) {
    if (state.hasAccess) {
      return (
        <AppProvider>
          <Navbar />
          <Router />
        </AppProvider>
      );
    } else {
      return (
        <div className="mx-auto block w-[330px]">
          <h1 className="text-center text-2xl mt-5 font-extrabold text-red-500">
            🤖 Bot kana fayyadamuuf #channel keenya #Join gochuu qabdu! San booda #page kana #reload ykn cufaa banaa👇
          </h1>
          <Link
            className="text-center mx-auto block font-extrabold py-2 px-4 rounded bg-blue-500 text-white mt-3 animate-pulse"
            to="https://t.me/Oro_Tech_Tipz"
          >
            JOIN CHANNEL
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div className="mx-auto block w-[330px]">
        <h1 className="text-center text-2xl mt-5 font-extrabold text-red-500">
          Open the bot in Telegram
        </h1>
        <Link
          className="text-center py-2 px-4 mx-auto font-extrabold block rounded bg-blue-500 text-white mt-3 animate-pulse"
          to="https://t.me/OromoTranslatorBot"
        >
          CLICK HERE
        </Link>
      </div>
    );
  }
}

export default App;
