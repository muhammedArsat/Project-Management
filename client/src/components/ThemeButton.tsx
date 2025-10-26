import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { Moon } from "lucide-react";
const ThemeButton = () => {
    const context = useContext(ThemeContext);

  return (
    <span
      className="font-heading text-neutral-700 dark:text-neutral-300 cursor-pointer px-4 py-2 rounded flex items-center gap-2"
      onClick={context?.toggleTheme}
    >
      <Moon strokeWidth={1.3} />
      <span className="flex-1">Dark</span>
      <span className="bg-neutral-300 w-10 h-5 relative rounded-full">
        <div
          className={`bg-neutral-500 w-4 h-4 rounded-full absolute top-[1px]  transition-all duration-200 ${
            context?.isDark ? "translate-x-5" : "translate-x-1"
          }`}
        ></div>
      </span>
    </span>
  );
};

export default ThemeButton;
