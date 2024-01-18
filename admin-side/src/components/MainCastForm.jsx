import { useDispatch, useSelector } from "react-redux";

/* eslint-disable react/prop-types */

function MainCastForm({index}) {
  
  const dispatch = useDispatch()
  const addData = useSelector((state) => state.movie.addData);
  const arr = useSelector((state) => state.movie.arr);
  
  const addCastForm = (e) => {
    e.preventDefault();
    if (addData.casts.length < 3) {
      addData.casts.push({
        name: "",
        profilePict: "",
      });
      dispatch({
        type: "changeData",
        state: "arr",
        payload: [...arr, 1],
      });
    }
  };

  const castForm = (index, e) => {
    let casts = [...addData.casts];
    casts[index][e.target.name] = e.target.value;

    dispatch({
      type: "changeData",
      state: "addData",
      payload: { ...addData, casts },
    });
  };

  return (
    <div
      className="md-form mb-1 d-flex justify-content-between gap-2"
    >
      <div>
        <input
          onChange={() => castForm(index, event)}
          value={addData.casts[index].name}
          className="form-control"
          placeholder="Robert Downey Jr."
          type="text"
          name="name"
          id={"name" + index}
          autoComplete="off"
          required
        />
        <label data-error="wrong" data-success="right" htmlFor={"name" + index}>
          Cast Name
        </label>
      </div>
      <div>
        <input
          onChange={() => castForm(index, event)}
          value={addData.casts[index].profilePict}
          className="form-control"
          placeholder="Image URL"
          type="text"
          name="profilePict"
          id={"profilePict" + index}
          autoComplete="off"
          required
        />
        <label data-error="wrong" data-success="right" htmlFor={"profilePict" + index}>
          Cast Image URL
        </label>
      </div>
      <button
        onClick={addCastForm}
        className="btn btn-outline-success"
        style={{
          height: "40px",
          width: "40px",
          display: addData.casts.length == 3 ? "none" : "",
        }}
      >
        +
      </button>
    </div>
  );
}

export default MainCastForm;