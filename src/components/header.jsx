import { useState } from "react";
import Modal from "./modal";

export default function Header({ setFilter, addTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priority: "",
    assignee: "",
    title_like: "",
  });

  function handleFilter(e) {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);

    const params = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setFilter(params.toString());
  }

  return (
    <>
      <header className="w-full min-h-20 bg-green-800 flex flex-wrap gap-20 justify-center items-center p-4">
        <select
          name="priority"
          value={filters.priority}
          className="bg-white rounded-full"
          onChange={handleFilter}
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>
          <input
            type="text"
            name="assignee"
            value={filters.assignee}
            placeholder="Assigned to...."
            className="bg-white rounded-full px-2"
            onChange={handleFilter}
          />
        </label>

        <label>
          <input
            type="text"
            name="title_like"
            value={filters.title_like}
            placeholder="Search......"
            className="bg-white rounded-full px-2"
            onChange={handleFilter}
          />
        </label>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-green-300  cursor-pointer px-5 py-2 rounded-full"
        >
          Add Task
        </button>
      </header>

      {isOpen && <Modal onClose={() => setIsOpen(false)} onSubmit={addTask} />}
    </>
  );
}
