import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Plus, Search, Users } from "lucide-react";
import { getAssignee } from "@/data/tasks";

/* Colors sampled from the UI kit */
export const colors = {
  bg: "#0B0B0B",
  surface: "#1F1F1F",
  ink: "#1A1A1A",
  accent: "#FFA23E",
  low: "#4ADE80",
  medium: "#FACC15",
  high: "#F87171",
};

const PRIORITIES = [
  { label: "All", active: true },
  { label: "Low", dot: colors.low },
  { label: "Medium", dot: colors.medium },
  { label: "High", dot: colors.high },
];

const DUE_DATES = [
  { label: "All", active: true },
  { label: "Today" },
  { label: "Tomorrow" },
  { label: "Next week" },
];

function Segmented({ label, options }) {
  return (
    <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#1F1F1F] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <span className="shrink-0 pl-3 pr-1 text-xs text-white/50">{label}</span>
      {options.map((o) => (
        <button
          key={o.label}
          type="button"
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#FFA23E] ${
            o.active
              ? "bg-white text-[#1A1A1A]"
              : "text-white/70 hover:text-white"
          }`}
        >
          {o.dot && (
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: o.dot }}
            />
          )}
          {o.label}
        </button>
      ))}
    </div>
  );
}

function AssigneeChip({ assignees }) {
  const optionClass = "bg-[#1F1F1F] text-white";

  return (
    <div className="relative">
      <Users
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
      />
      <select
        aria-label="Filter by assignee"
        defaultValue=""
        className="h-[34px] appearance-none rounded-full border border-white/10 bg-[#1F1F1F] pl-8 pr-8 text-xs font-medium text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFA23E]"
      >
        <option value="" className={optionClass}>
          Assigned to
        </option>
        {assignees.map((name) => (
          <option key={name} value={name} className={optionClass}>
            {name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70"
      />
    </div>
  );
}

function SearchBar() {
  return (
    <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-4 transition-shadow focus-within:ring-2 focus-within:ring-[#FFA23E] lg:h-12 lg:max-w-xl">
      <Search size={16} color={colors.ink} className="shrink-0" />
      <input
        type="search"
        placeholder="Search tasks..."
        aria-label="Search tasks"
        className="min-w-0 flex-1 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-black/40 [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  );
}

function AddTaskButton() {
  return (
    <motion.button
      type="button"
      aria-label="Add task"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="group flex h-11 shrink-0 items-center gap-2 rounded-full bg-white p-1.5 text-sm font-medium text-[#1A1A1A] outline-none transition-colors hover:bg-[#FFA23E] focus-visible:ring-2 focus-visible:ring-[#FFA23E] sm:pr-4 lg:h-12"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-90 lg:h-9 lg:w-9">
        <Plus size={16} />
      </span>
      <span className="hidden sm:inline">Add task</span>
    </motion.button>
  );
}

export default function Header() {
  const reduce = useReducedMotion();
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    let ignore = false;
    getAssignee()
      .then((list) => {
        if (!ignore) setAssignees(list);
      })
      .catch(console.error);
    return () => {
      ignore = true;
    };
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.25 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
  };

  return (
    <header
      className="flex w-full flex-wrap items-center gap-3 px-4 pb-2 pt-4 sm:px-6 lg:px-8 lg:pt-5"
      style={{ background: colors.bg }}
    >
      <div className="ml-auto flex items-center gap-3 lg:order-3 lg:ml-0">
        <h1 className="font-bold text-white">Flow Tasks</h1>
      </div>

      {/* Search + add task */}
      <motion.div
        className="order-last flex w-full items-center gap-3 lg:order-2 lg:w-auto lg:flex-1"
        initial={reduce ? false : { y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        <SearchBar />
        <AddTaskButton />
      </motion.div>

      {/* Filters */}
      <motion.div
        className="order-last flex w-full flex-wrap items-center gap-2 pt-1 lg:pt-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="max-w-full">
          <Segmented label="Priority" options={PRIORITIES} />
        </motion.div>
        <motion.div variants={item}>
          <AssigneeChip assignees={assignees} />
        </motion.div>
        <motion.div variants={item} className="max-w-full">
          <Segmented label="Due" options={DUE_DATES} />
        </motion.div>
      </motion.div>
    </header>
  );
}
