// import useFetchData from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import TableData from "../components/TableData";
import "../assets/custom.css";
import { fetchAnyData } from "../stores/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Genre() {
  // fetch with custom hook
  // const { data: genreData } = useFetchData("/genres");

  const [isUseEffectDone, setIsUseEffectDone] = useState(false);

  // fetch with redux
  const genreData = useSelector((state) => state.genre.genreData);
  const errorGenre = useSelector((state) => state.genre.error);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      await dispatch(fetchAnyData("/genres"));
      setIsUseEffectDone(true);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorGenre && isUseEffectDone) {
    toast.error(errorGenre, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  // state for form
  const [addData, setAddData] = useState({
    name: "",
    edit: false,
    editId: null,
  });

  const submitAddForm = async (e) => {
    try {
      e.preventDefault();
      if (!addData.edit) {
        const res = await fetch("http://localhost:3000/admin/genres", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            ...addData,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        });
        if (!res.ok) throw { name: "postError", message: "Failed to post" };
        setAddData({
          ...addData,
          name: "",
        });
        document.getElementById("addGenre").click();
        await dispatch(fetchAnyData("/genres"));
        toast.success("Success add new genre", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        editData(addData.editId);
        document.getElementById("addGenre").click();
        await dispatch(fetchAnyData("/genres"));
        toast.success("Success edit genre", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Edit Genre
  const editData = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/admin/genres/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          ...addData,
        }),
      });
      if (!res.ok) throw { name: "deleteError", message: "Failed to edit" };
      await dispatch(fetchAnyData("/genres"));
      console.log("success update genre");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const addForm = (e) => {
    setAddData({
      ...addData,
      name: e.target.value,
    });
  };

  return (
    <>
      {isUseEffectDone == false && (
        <div className="overlay">
          <Loading />
        </div>
      )}
      <div className="dashboard-section">
        <div className="container d-flex flex-column justify-content-center pt-5">
          <button
            className="btn btn-dark align-self-end my-3"
            style={{
              width: "120px",
              backgroundColor: "#222529",
              color: "#f2f2f2",
            }}
            data-toggle="modal"
            data-target="#addGenre"
            onClick={() => setAddData({ ...addData, edit: false, name: "" })}
          >
            Add Genre
          </button>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Genre Name</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated At</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {genreData.map((genre, index) => (
                  <TableData
                    key={genre.id}
                    data={genre}
                    index={index}
                    setAddData={setAddData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL HERE */}
      <div
        className="modal fade"
        id="addGenre"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ marginTop: "10%" }}
        >
          <div className="modal-content text-white bg-dark">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">
                {addData.edit ? "Edit" : "Add"} Genre
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span style={{ color: "#f2f2f2" }} aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <form onSubmit={submitAddForm}>
              <div className="modal-body mx-3">
                <div className="md-form my-3">
                  <input
                    onChange={addForm}
                    // value={addData.name}
                    value={addData.name}
                    className="form-control"
                    placeholder="Ex: Action"
                    type="text"
                    name="title"
                    id="title"
                    required
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="title"
                  >
                    Genre Name
                  </label>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-secondary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Genre;
