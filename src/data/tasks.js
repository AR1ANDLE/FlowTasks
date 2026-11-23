import axios from "axios";

const BASE_API = "https://flowboard-api-virid.vercel.app/cards";

async function getTasks() {
  const response = await axios.get(BASE_API);
  return response.data;
}

async function getAssignee() {
  const tasks = await getTasks();
  const names = new Set(tasks.map((task) => task.assignee).filter(Boolean));
  return Array.from(names).sort();
}

export { getTasks, getAssignee };
