import React, { createContext,  useContext } from "react";

import io from 'socket.io-client'
const socket = io.connect(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001') 
const SocketContext = createContext(socket);

const SocketProvider: React.FC = ({children}) => {


  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within a SocketProvider");
  return context
}

export default SocketProvider