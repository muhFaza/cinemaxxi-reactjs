export default function usePostData() {
  return async (url, data) => {
    async function post() {
      try {
        const res = await fetch("http://localhost:3000/admin" + url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw { name: "postDataError" };
        console.log("Success post to" + url);
      } catch (error) {
        console.log(error);
      }
    }

    return post;
  };
}
