import axios from "axios";
import { useEffect, useState } from "react";

// API links
const baseAPI = "https://flowboard-api-virid.vercel.app/cards";

export default function useFetch(
  option = "get",
  assignee = null,
  priority = null,
  title_like = null,
) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (option === "get") {
        const response = await axios.get(baseAPI, {
          params: {
            assignee,
            priority,
            title_like,
          },
        });
        setData(response.data);
      }
    }
    loadData();
  }, [option, assignee, priority, title_like]);

  return data;
}
