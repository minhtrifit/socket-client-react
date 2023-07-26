import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";

const Socketomponent = () => {
  const dispatch = useDispatch();

  const userUid = useSelector<RootState, string | undefined>(
    (state) => state.socket.uid
  );

  const username = useSelector<RootState, string | undefined>(
    (state) => state.socket.username
  );

  const onlineUsers = useSelector<RootState, number | undefined>(
    (state) => state.socket.online
  );

  const socket = useSocket("http://localhost:5500", {
    autoConnect: false,
  });

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);

  useEffect(() => {
    socket.connect();
    dispatch({ type: "update_socket", payload: socket });
    StartListeners();
    SendHandshake();

    // eslint-disable-next-line
  }, []);

  // Listen event to socket
  const StartListeners = () => {
    socket.on("user_connected", (rs: { clientId: string; uid: string }) => {
      console.info("Client ID:", rs.clientId);
      console.info("Uid:", rs.uid);
      dispatch({ type: "update_uid", payload: rs.uid });
    });

    socket.on("user_exist", (rs: string) => {
      console.log(rs);
    });

    socket.on("connect_users_amount", (rs: number) => {
      console.log("Online:", rs);
      dispatch({ type: "update_online", payload: rs });
    });
  };

  // Send event to socket
  const SendHandshake = async () => {
    socket.emit(
      "get_connect",
      { username: username },
      (checkConnect: boolean) => {
        console.log("Check connect socket:", checkConnect);
      }
    );
  };

  return (
    <div>
      {userUid ? (
        <div>
          <p>User Uid: {userUid}</p>
          <p>Online users: {onlineUsers}</p>
        </div>
      ) : (
        "unknow"
      )}
    </div>
  );
};

export default Socketomponent;
