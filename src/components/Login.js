import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const INITIAL_USER = {
  email: "",
  password: "",
};

const NewComment = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [showWrongCredentials, setShowWrongCredentials] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (event, user) => {
    event.preventDefault();
    axios
      .post("https://finhouse-reporting.herokuapp.com/api/v1/user/login", user)
      .then((response) => {
        navigate("/home");
      })
      .catch((error) => {
        setShowWrongCredentials(true);
      });
  };

  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h3>Email and Password</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          handleLoginSubmit(event, user);
          setUser(INITIAL_USER);
        }}
      >
        <input
          name="email"
          type="text"
          placeholder="Your Email"
          onChange={handleOnChange}
          value={user.email}
        />
        <input
          name="password"
          placeholder="Your Password"
          type="text"
          onChange={handleOnChange}
          value={user.password}
        ></input>
        <button className="ui blue button" type="submit">
          Login
        </button>

        {showWrongCredentials ? (
          <div className="ui relaxed divided list">
            <p>Wrong Credentials</p>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default NewComment;
