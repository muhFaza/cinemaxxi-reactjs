import { useSelector } from "react-redux";
export default function CastsModal() {
  const viewCasts = useSelector((state) => state.movie.viewCasts);
  return (
    <>
      <div
        className="modal fade"
        id="castsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg"
          role="document"
          style={{ top: "20vh" }}
        >
          <div className="modal-content text-white bg-dark">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Main Casts</h4>
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
            <div>
              <div className="modal-body mx-3 d-flex justify-content-center gap-2">
                {/* LOOP */}

                {viewCasts.map((el, index) => (
                <div key={'casts'+index}>
                  <img
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "scale-down",
                    }}
                    src={el.profilePict}
                    alt=""
                  />
                  <h5 className="text-center mt-3">{el.name}</h5>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
