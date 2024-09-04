import { Link } from "react-router-dom";

export function Footer(){
  return (
     <div className="footer animate-pulse">
      <Link to="http://t.me/plxor">
       <h1 className="text-2xl text-center font-extrabold mt-7 pb-8">Made with 🍔 & ♥️</h1>
      </Link>
     </div>
    )
}