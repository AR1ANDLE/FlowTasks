import useFetch from "../service/useFetch";

export default function Header() {
  const data = useFetch();
  const assignees = Array.from(
    new Set(data.map((item) => item.assignee).filter(Boolean)),
  );
  const priorities = Array.from(
    new Set(data.map((item) => item.priority).filter(Boolean)),
  );

  return (
    <header className="sticky top-0 z-20 w-full bg-accent border-b-2 border-text px-6 py-3.5 text-text font-body shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          FlowTasks
        </h1>

        {/* Filter & Search Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Filter by Assignee"
            defaultValue=""
            className="bg-bg text-text text-sm font-medium px-3.5 py-2 rounded-lg border border-text/30 hover:border-text focus:outline-none focus:ring-2 focus:ring-text/20 transition"
          >
            <option value="">All Assignees</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Priority"
            defaultValue=""
            className="bg-bg text-text text-sm font-medium px-3.5 py-2 rounded-lg border border-text/30 hover:border-text focus:outline-none focus:ring-2 focus:ring-text/20 transition capitalize"
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <div className="relative">
            <input
              type="search"
              placeholder="Search cards..."
              aria-label="Search cards"
              className="w-56 sm:w-64 bg-bg text-text placeholder:text-text/55 text-sm pl-9 pr-3.5 py-2 rounded-lg border border-text/30 hover:border-text focus:outline-none focus:ring-2 focus:ring-text/20 transition cursor-text"
            />
            <svg
              className="w-4 h-4 text-text/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
