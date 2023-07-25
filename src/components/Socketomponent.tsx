import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";

const Socketomponent = () => {
  const dispatch = useDispatch();

  const userUid = useSelector<RootState, string | undefined>(
    (state) => state.socket.uid
  );

  const socket = useSocket("http://localhost:5500", {
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();
    dispatch({ type: "update_socket", payload: socket });
    StartListeners();
    SendHandshake();

    // eslint-disable-next-line
  }, []);

  const StartListeners = () => {
    socket.on("user_connected", (rs: { clientId: string; uid: string }) => {
      console.info("Client ID:", rs.clientId);
      console.info("Uid:", rs.uid);
      dispatch({ type: "update_uid", payload: rs.uid });
    });
  };

  const SendHandshake = async () => {
    socket.emit("get_connect", (checkConnect: boolean) => {
      console.log("Check connect socket:", checkConnect);
    });
  };

  return <div>{userUid ? userUid : "unknow"}</div>;
};

export default Socketomponent;
