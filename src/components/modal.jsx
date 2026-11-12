
import { useState } from "react"

const regex = {
    title: /^.{1,100}$/,
    description: /^.{1,500}$/,
    assignee: /^[\p{L}\s'-]+$/u,
}

const initialForm = {
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignee: "",
    dueDate: "",
    tags: []
}

export default function Modal({ onClose, onSubmit }) {
    const [form, setForm] = useState(initialForm)
    const [tagInput, setTagInput] = useState("")
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function addTag(e) {
        e.preventDefault()

        const tag = tagInput.trim()

        if (!tag || form.tags.includes(tag)) return

        setForm(prev => ({
            ...prev,
            tags: [...prev.tags, tag]
        }))

        setTagInput("")
    }

    function removeTag(tagToRemove) {
        setForm(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    function validate() {
        const newErrors = {}

        Object.entries(regex).forEach(([field, pattern]) => {
            if (!pattern.test(form[field].trim())) {
                newErrors[field] = `${field} is invalid`
            }
        })

        if (!form.dueDate) {
            newErrors.dueDate = "Due date is required"
        } else {
            const date = new Date(`${form.dueDate}T00:00:00`)
            if (Number.isNaN(date.getTime()) ||
                date.toISOString().slice(0, 10) !== form.dueDate) {
                newErrors.dueDate = "Invalid date"
            }
        }

        if (!["low", "medium", "high"].includes(form.priority)) {
            newErrors.priority = "Invalid priority"
        }

        if (!["todo", "in-progress", "done"].includes(form.status)) {
            newErrors.status = "Invalid status"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!validate()) return

        const newTask = {
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
            assignee: form.assignee.trim(),
            tags: form.tags
        }

        onSubmit(newTask)
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-[90%] max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white px-5 py-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Create task</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="mb-1 block">Title</label>
                        <input
                            required
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                            placeholder="Task title"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                            placeholder="Task description"
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block">Priority</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        >
                            <option value="todo">Todo</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block">Assignee</label>
                        <input
                            name="assignee"
                            value={form.assignee}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                            placeholder="Assigned to"
                        />
                        {errors.assignee && (
                            <p className="text-sm text-red-500">
                                {errors.assignee}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block">Due date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        />
                        {errors.dueDate && (
                            <p className="text-sm text-red-500">
                                {errors.dueDate}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block">Tags</label>

                        <div className="flex gap-2">
                            <input
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                className="w-full rounded-lg border p-3"
                                placeholder="Enter a tag"
                            />

                            <button
                                type="button"
                                onClick={addTag}
                                className="rounded-lg bg-blue-600 px-4 text-white"
                            >
                                Add
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {form.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1"
                                >
                                    {tag}

                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-red-500"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Create task
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
