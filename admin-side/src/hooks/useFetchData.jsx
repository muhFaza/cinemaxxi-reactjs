import { useEffect, useState } from "react";

// custom hooks
function useFetchData(path) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMe() {
      try {
        let respond = await fetch("http://localhost:3000/admin" + path, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        if (!respond.ok) throw { name: "fetchError" };
        respond = await respond.json();
        setData(respond);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMe();
  }, []);

  return { data };
}

export default useFetchData;
