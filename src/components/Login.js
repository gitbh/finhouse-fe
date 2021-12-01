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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (event, user) => {
    setIsLoading(true);
    event.preventDefault();
    axios
      .post("https://finhouse-reporting.herokuapp.com/api/v1/user/login", user)
      .then((response) => {
        navigate("/home");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
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
        { isLoading ? (
            <p><img style={{width:30, height:30}} src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" alt='loading...' /></p>
          ) : (
            <button className="ui blue button" type="submit">
              Login
            </button>
        )}

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
