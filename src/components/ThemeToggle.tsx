
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Toggle } from "@/components/ui/toggle";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Toggle
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className="rounded-full p-2 hover:bg-morocco-sand/10 transition-colors"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4 text-morocco-gold" />
        )}
      </Toggle>
    </motion.div>
  );
};

export default ThemeToggle;
