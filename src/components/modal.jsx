import Swal from "sweetalert2";

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  form = {},
  handleChange,
  title = "Modify card",
  submitLabel = "Save changes",
}) {
  if (!isOpen) return null;

  function handleFormSubmit(e) {
    e.preventDefault();
    let inputs = document
      .querySelector(".modal")
      .querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      let value = input.value;
      if (!value) {
        input.style.outline = "1px solid red";
        return Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: `Please enter a valid ${input.name}`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
    return onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 modal">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>

          <button type="button" onClick={onClose} className="cursor-pointer">
            X
          </button>
        </div>

        <input
          required
          type="text"
          name="title"
          value={form.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
        />

        <select
          name="status"
          value={form.status ?? "todo"}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          name="priority"
          value={form.priority ?? "medium"}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          name="assignee"
          value={form.assignee ?? ""}
          onChange={handleChange}
          placeholder="Assignee"
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate ?? ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-900 text-white rounded cursor-pointer"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
