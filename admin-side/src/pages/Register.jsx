import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
// import usePostData from "../hooks/usePostData";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false)

  function registerForm(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }

  async function submitForm(e) {
    try {
      setLoading(true)
      e.preventDefault();

      // const error = usePostData()
      // if (error) throw {name: 'postDataError'}

      const post = await fetch("http://localhost:3000/admin/register", {
        method: "post",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (!post.ok)
        throw { name: "registerError", message: "Failed to register" };

      setRegisterData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
      console.log("success register");
      toast.success("Success register", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
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
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    {loading == true && (
        <div className="overlay">
          <Loading />
        </div>
      )}
      <div className="dashboard-section" id="dashboard-section">
        <div className="container d-flex flex-column justify-content-center pt-5">
          <div className="container" style={{ width: "35%", height: "53%" }}>
            <form
              onSubmit={submitForm}
              action=""
              className="h-100 d-flex flex-column justify-content-evenly mx-2 gap-2 pt-5"
            >
              <div className="form-group">
                <input
                  onChange={registerForm}
                  value={registerData.username}
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={registerForm}
                  value={registerData.email}
                  className="form-control"
                  placeholder="Email: example@mail.com"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  onChange={registerForm}
                  value={registerData.password}
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={registerForm}
                  value={registerData.phoneNumber}
                  className="form-control"
                  placeholder="Phone Number"
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={registerForm}
                  value={registerData.address}
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  id="address"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary">
                  Register New Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
