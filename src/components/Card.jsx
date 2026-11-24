import { Pen, Trash } from "lucide-react";

const PRIORITY_STYLES = {
  high: "bg-[#d96b52] text-bg border-text",
  medium: "bg-[#e2a84b] text-text border-text",
  low: "bg-accent/35 text-text border-text/60",
};

export default function Card({ data, onEdit, onDelete, onSelect }) {
  const { title, priority, assignee, description } = data;

  const priorityKey = priority?.toLowerCase() || "low";
  const badgeStyle = PRIORITY_STYLES[priorityKey] || PRIORITY_STYLES.low;

  const initials = assignee
    ? assignee
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <article
      onClick={() => onSelect?.(data)}
      className="min-h-56 w-full bg-bg rounded-xl border-2 border-text/80 p-5 flex flex-col justify-between gap-4 shadow-[3px_3px_0px_#1b1b1b] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1b1b1b] hover:border-text transition-all duration-150 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-body text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyle}`}
        >
          {priority || "Normal"}
        </span>
      </div>

      <div className="flex flex-col gap-2 my-auto">
        <h3 className="font-heading text-xl font-bold text-text leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="font-body text-sm text-text/80 leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>
      </div>

      <div className="pt-3 border-t border-text/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 shrink-0 rounded-full bg-accent text-text font-body text-xs font-bold flex items-center justify-center border border-text">
            {initials}
          </span>
          <span className="font-body text-xs font-medium text-text truncate">
            {assignee || "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="Edit card"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(data);
            }}
            className="p-1.5 rounded-lg border border-transparent text-text/70 hover:text-text hover:bg-accent/30 hover:border-text/40 transition"
          >
            <Pen className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Delete card"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(data);
            }}
            className="p-1.5 rounded-lg border border-transparent text-text/70 hover:text-[#b8462c] hover:bg-[#d96b52]/15 hover:border-[#d96b52]/40 transition"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
