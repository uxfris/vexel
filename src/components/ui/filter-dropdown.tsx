"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils/cn";

interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  buttonClassName?: string;
}

export default function FilterDropdown({
  options,
  defaultValue,
  onChange,
  label,
  buttonClassName,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultOption =
    options.find((opt) => opt.value === defaultValue) || options[0];

  const [selected, setSelected] = useState<Option>(defaultOption);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block mb-2 text-sm font-medium text-muted-foreground-secondary">
          {label}
        </label>
      )}

      {/* Button */}
      <button
        onClick={toggleOpen}
        className={cn(
          "flex w-full items-center justify-between gap-1 px-4 py-2 text-2xl font-bold",
          buttonClassName
        )}
      >
        <span>{selected.label}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 ml-2 bg-popover min-w-full text-popover-foreground font-bold rounded-xl shadow-2xl border border-border overflow-hidden z-10"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={clsx(
                  "m-1 px-4 py-2 cursor-pointer hover:bg-surface-hover transition-all rounded-lg whitespace-nowrap",
                  option === selected && "bg-surface-hover"
                )}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
