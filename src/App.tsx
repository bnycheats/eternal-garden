import { IconContext } from "react-icons";
import Navigation from "./navigation";

function App() {
  return (
    <IconContext.Provider value={{ className: "fill-current text-2xl" }}>
      <Navigation />
    </IconContext.Provider>
  );
}

export default App;
