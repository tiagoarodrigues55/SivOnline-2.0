import React, { useState } from 'react'

interface Props{
  moderator?: boolean,
  newspaper?: boolean,
  roomName: string,
  password: string
  user: string,
}
interface JitsiTypes{
  dispose?: Function,
  executeCommand?: Function
  getParticipantsInfo?: Function
}
interface ParticipantJoined{
  id: string, 
  // displayName: string
}
const Jitsi: React.FC<Props> = ({moderator, newspaper, roomName, password, user}): React.ReactElement => {

    const jitsiContainerId = "jitsi-container-id";
    const [jitsi, setJitsi] = useState<JitsiTypes>({});
    const loadJitsiScript = () => {
      let resolveLoadJitsiScriptPromise = null;
  
      const loadJitsiScriptPromise = new Promise((resolve) => {
        resolveLoadJitsiScriptPromise = resolve;
      });
  
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = resolveLoadJitsiScriptPromise
      document.body.appendChild(script);
  
      return loadJitsiScriptPromise;
    };
    const initialiseJitsi = async () => {
      if (!window.JitsiMeetExternalAPI) {
        await loadJitsiScript();
      }
      if(newspaper){
        const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName,
          parentNode: document.getElementById(jitsiContainerId),
          userInfo: {displayName: user},
          width: 500,
          height: 350,
         
        });
      setJitsi(_jitsi)

      }else{
        if(moderator){
          const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            roomName,
            parentNode: document.getElementById(jitsiContainerId),
            userInfo: {displayName: user},
            width: 500,
            height: 430,
           
          });
        setJitsi(_jitsi)
  
        }else{
        const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName,
          parentNode: document.getElementById(jitsiContainerId),
          userInfo: {displayName: user},
          width: 500,
          height: 300,
          configOverwrite: { 
            startVideoOnly: false 
          },
          interfaceConfigOverwrite: {
         TOOLBAR_BUTTONS: [
              'microphone', 
              'camera',
          ],
          },
        });
      setJitsi(_jitsi)
      }
    }
  
    };
    React.useEffect(() => {
      initialiseJitsi();
  
      return () => jitsi?.dispose?.();
    }, []);


    return <div id={jitsiContainerId}  />;
  };
  
  export default Jitsi;