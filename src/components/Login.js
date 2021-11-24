import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const INITIAL_USER = {
  email: "",
  password: "",
};

const NewComment = () => {
  const [user, setUser] = useState(INITIAL_USER);

  const navigate = useNavigate();

  const handleLoginSubmit = (event, user) => {
    event.preventDefault();
    axios
      .post("https://finhouse-reporting.herokuapp.com/api/v1/user/login", user)
      .then((response) => {
        console.log("Login Successful");
        console.log(response.data);

        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
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
        <div className="ui mini icon input">
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            onChange={handleOnChange}
            value={user.email}
          />
        </div>
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
      </form>
    </>
  );
};

export default NewComment;
