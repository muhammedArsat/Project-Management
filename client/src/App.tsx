import ThemeProvider from "./providers/ThemeProvider";
import Routepaths from "./routes/Routepaths";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <ThemeProvider>
      <Routepaths />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

export default App;
