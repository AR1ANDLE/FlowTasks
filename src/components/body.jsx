import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "./modal";
import { InfinitySquareSnake } from "./infinity-square-snake";

const STATUSES = ["todo", "in-progress", "done"];
const API_BASE = "https://flowboard-api-virid.vercel.app/cards";
const WORKSPACE_HEADERS = { "X-Workspace": "public" };

const initialForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  assignee: "",
  dueDate: "",
  tags: [],
};

export default function Todo({ filter = "", cards = [], setCards }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}?${filter}`, {
          headers: WORKSPACE_HEADERS,
        });
        setCards(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load cards.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, setCards, retryCount]);

  function openAiModal() {
    setForm({ ...initialForm, tags: [] });
    setAiModalOpen(true);
  }
  function closeAiModal() {
    setAiModalOpen(false);
  }
  function handleAiSubmit() {}

  function AiModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <form className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">What would you like to do?</h2>

            <button
              type="button"
              className="cursor-pointer"
              onClick={closeAiModal}
            >
              X
            </button>
          </div>

          <textarea
            name="description"
            value={form.description ?? ""}
            onChange={handleChange}
            placeholder="Describe your task or idea here..."
            className="border p-2 w-full rounded"
          />
        </form>
      </div>
    );
  }

  function openAddModal() {
    setSelectedId(null);
    setForm({ ...initialForm, tags: [] });
    setIsOpen(true);
  }

  async function modify(id) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/${id}`, {
        headers: WORKSPACE_HEADERS,
      });
      const card = response.data;

      setForm({
        title: card.title ?? "",
        description: card.description ?? "",
        status: card.status ?? "todo",
        priority: card.priority ?? "medium",
        assignee: card.assignee ?? "",
        dueDate: card.dueDate ?? "",
        tags: card.tags ?? [],
      });

      setSelectedId(id);
      setIsOpen(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "Failed to load card details.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedId(null);
    setForm({ ...initialForm, tags: [] });
  }

  async function handleSubmit() {
    const isEditing = Boolean(selectedId);

    const result = await Swal.fire({
      title: isEditing ? "Save changes?" : "Add this card?",
      text: isEditing
        ? "Are you sure you want to update this card?"
        : "Are you sure you want to create this card?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#312e81",
      cancelButtonColor: "#6b7280",
      confirmButtonText: isEditing ? "Yes, save it" : "Yes, add it",
      customClass: { container: "!z-[9999]" },
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      if (isEditing) {
        const response = await axios.put(
          `${API_BASE}/${selectedId}?password=1234`,
          form,
          { headers: WORKSPACE_HEADERS },
        );

        setCards((prev) =>
          prev.map((card) => (card.id === selectedId ? response.data : card)),
        );
      } else {
        const response = await axios.post(`${API_BASE}?password=1234`, form, {
          headers: WORKSPACE_HEADERS,
        });

        setCards((prev) => [...prev, response.data]);
      }

      closeModal();

      Swal.fire({
        icon: "success",
        title: isEditing ? "Updated!" : "Added!",
        text: isEditing
          ? "The card has been updated."
          : "The card has been added.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.details[0].message,
        text: "Could not save your changes.",
        customClass: { container: "!z-[9999]" },
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Delete this card?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7f1d1d",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${id}?password=1234`, {
        headers: WORKSPACE_HEADERS,
      });

      setCards((prev) => prev.filter((card) => card.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The card has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete the card!",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <InfinitySquareSnake className="text-indigo-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-100 p-4 text-center">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
        <button
          onClick={() => setRetryCount((prev) => prev + 1)}
          className="text-white bg-indigo-900 hover:bg-indigo-800 rounded-2xl cursor-pointer px-6 py-2.5 text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-dvh bg-gray-100 p-4">
      <div className="flex justify-end mb-4 gap-3">
        <button
          onClick={openAddModal}
          className="text-white bg-indigo-900 hover:bg-indigo-800 rounded-2xl cursor-pointer px-4 py-2.5 text-sm font-medium"
        >
          + Add Card
        </button>
        <button
          onClick={openAiModal}
          className="text-white bg-indigo-900 hover:bg-indigo-800 rounded-2xl cursor-pointer px-4 py-2.5 text-sm font-medium"
        >
          Generate with AI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map((section) => {
          const sectionCards = cards.filter((item) => item.status === section);

          return (
            <section
              key={section}
              id={section}
              className="h-full bg-indigo-500 p-4 rounded-lg"
            >
              <h2 className="first-letter:uppercase text-white font-bold mb-4 gap-2">
                {section}{" "}
                <span className="bg-white text-indigo-900 rounded-full px-2 py-1 text-sm">
                  {sectionCards.length}
                </span>
              </h2>

              {sectionCards.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onModify={() => modify(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </section>
          );
        })}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          form={form}
          handleChange={handleChange}
          title={selectedId ? "Modify card" : "Add card"}
          submitLabel={selectedId ? "Save changes" : "Add card"}
        />
      )}

      {aiModalOpen && (
        <AiModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      )}
    </div>
  );
}

function Card({ item, onModify, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {item.tags?.map((tag) => (
          <span
            className="bg-gray-200 text-gray-800 px-2 py-1 text-sm rounded-full uppercase"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-500 text-sm">
        Assigned to: {item.assignee || "Unassigned"}
      </p>
      <p className="text-gray-500 text-sm mb-3">
        Due date: {item.dueDate || "No due date"}
      </p>

      <button
        onClick={onModify}
        className="text-white bg-indigo-900 rounded-2xl cursor-pointer px-4 py-2.5 text-sm"
      >
        Modify
      </button>
      <button
        onClick={onDelete}
        className="text-white bg-red-900 rounded-2xl cursor-pointer px-4 py-2.5 text-sm ml-2"
      >
        Delete
      </button>
    </div>
  );
}
