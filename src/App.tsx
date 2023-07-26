import { useState } from "react";
import Socketomponent from "./components/Socketomponent";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "./redux/store";

const App = () => {
  const dispatch = useDispatch();

  const [usernameValue, setUsernameValue] = useState<string | undefined>("");

  const username = useSelector<RootState, string | undefined>(
    (state) => state.socket.username
  );

  const handleSubmitUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "update_username", payload: usernameValue });
    setUsernameValue("");
  };

  return (
    <div>
      {username ? (
        <Socketomponent />
      ) : (
        <form onSubmit={(e) => handleSubmitUsername(e)}>
          <label>Enter username:</label>
          <br />
          <input
            type="text"
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
          />
          <br />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default App;
