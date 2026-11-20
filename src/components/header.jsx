import { useState } from "react";
import Modal from "./modal";

export default function Header({ setFilter, addTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});
  const [filters, setFilters] = useState({
    priority: "",
    assignee: "",
    title_like: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFilter(e) {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);

    const params = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value);
      }
    });

    setFilter(params.toString());
  }

  function handleSubmit(task) {
    addTask(task);
    setIsOpen(false);
  }

  return (
    <>
      <header className="w-full min-h-20 bg-indigo-600 flex flex-wrap gap-6 justify-center items-center p-4">
        <select
          name="priority"
          value={filters.priority}
          className="bg-white rounded-full px-3 py-2 shadow-md"
          onChange={handleFilter}
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          name="assignee"
          value={filters.assignee}
          placeholder="Assigned to..."
          className="bg-white rounded-full px-3 py-2 shadow-md"
          onChange={handleFilter}
        />

        <input
          type="text"
          name="title_like"
          value={filters.title_like}
          placeholder="Search..."
          className="bg-white rounded-full px-3 py-2 shadow-md"
          onChange={handleFilter}
        />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-indigo-900 text-white shadow-md cursor-pointer px-5 py-2 rounded-full"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => {
            setFilters({
              priority: "",
              assignee: "",
              title_like: "",
            });
            setFilter("");
          }}
          className="bg-indigo-900 text-white shadow-md cursor-pointer px-5 py-2 rounded-full"
        >
          Reset Filters
        </button>
      </header>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
        />
      )}
    </>
  );
}
