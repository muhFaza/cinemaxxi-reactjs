import { useState } from "react";
import { toast } from "react-toastify";

export default function AddForm() {

  const [addData, setAddData] = useState({
    title: '',
    synopsis: '',
    trailerUrl: '',
    imgUrl: '',
    rating: '',
    genreId: '',
  })

  const submitAddForm = async (e) => {
    try {
      e.preventDefault()
      const slug = addData.title.split(' ').join('-')
      const authorId = 1
      const res = await fetch('http://localhost:3000/admin/movies', {
        method: 'post',
        headers: { "Content-Type": "application/json", access_token: localStorage.getItem('access_token') },
        body: JSON.stringify({...addData, slug, authorId, createdAt: new Date(), updatedAt: new Date()}),
      })
      if (!res.ok) throw {name: 'postError', message: 'Failed to post'}
      setAddData({
        title: '',
        synopsis: '',
        trailerUrl: '',
        imgUrl: '',
        rating: '',
        genreId: '',
      })
      console.log('success add new movie');
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
  }
  const addForm = (e) => {
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="dashboard-section" id="dashboard-section" style={{minWidth: '300px'}}>
        <div className="container d-flex flex-column justify-content-center pt-5">
          <div className="container" style={{ maxWidth: "400px",}}>
            <form
              onSubmit={submitAddForm}
              action=""
              className="h-100 d-flex flex-column justify-content-evenly mx-2 gap-2 pt-5"
            >
              <div className="form-group">
                <input
                  onChange={addForm}
                  value={addData.title}
                  className="form-control"
                  placeholder="Movie Title"
                  type="text"
                  name="title"
                  id="title"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={addForm}
                  value={addData.synopsis}
                  className="form-control"
                  placeholder="Synopsis ..."
                  name="synopsis"
                  id="synopsis"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={addForm}
                  value={addData.email}
                  className="form-control"
                  placeholder="Trailer URL"
                  type="text"
                  name="trailerUrl"
                  id="trailerUrl"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={addForm}
                  value={addData.password}
                  className="form-control"
                  placeholder="Image URL"
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <div className="form-group">
                  <input
                    onChange={addForm}
                    value={addData.phoneNumber}
                    className="form-control"
                    placeholder="Movie Rating"
                    type="number"
                    name="rating"
                    id="rating"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={addForm}
                    value={addData.phoneNumber}
                    className="form-control"
                    placeholder="Genre"
                    type="number"
                    name="genreId"
                    id="genreId"
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
