/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { FC, useEffect, useState } from "react";
import { logger } from "./sdk";
import axios from 'axios';

interface IProps {
  isDarkMode: boolean;
  agentName: string;
  agentEmailId: string;
}

const App: FC<IProps> = (props) => {

  const componentVersion = "2.0";
  const SURFLY_API_KEY = "<YOUR_ORG_SURFLY_REST_API_KEY>";
  const SURFLY_HOME = "surfly.com/v2"

  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentEmailId, setAgentEmailId] = useState("");
  const [surflyAgentId, setSurflyAgentId] = useState("");
  const [surflyAgentToken, setSurflyAgentToken] = useState("");
  const [pin, setPIN] = useState("");

  function getSurflyData(agentName: string, agentEmailId: string): void {
    const url = `https://${SURFLY_HOME}/agents/access-token/?api_key=${SURFLY_API_KEY}`
    logger.debug(`URL for getSurflyData: ${url}`);
    const request = {
      "email": agentEmailId,
      "name": agentName,
      "role": "agent"
    };
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    };
    axios.post(url,request, config)
      .then((result) => {
        if(result.data){
          if((surflyAgentId == "") && (surflyAgentToken == "")){
            setSurflyAgentId(result.data.agent_id);
            setSurflyAgentToken(result.data.agent_token);
          }
        } else {
          logger.error(`There is an error with Surfly API`);
        }
      })
      .catch((err) => { 
        logger.error(err);
      });
  }
  
  function cheeckActiveSession(surflyAgentId: string): void {
    const url = `https://${SURFLY_HOME}/sessions/?api_key=${SURFLY_API_KEY}&active_session=true&agent_id=${surflyAgentId}`
    logger.debug(`URL for cheeckActiveSession: ${url}`);
    axios.get(url)
      .then((result) => {
        if(result.data[0]){
          setPIN(result.data[0].pin);
        } else {
          // await writeCustomerHistoryEvent();
          logger.info(`New coBrowse session`);
        }
        setMounted(true);
      })
      .catch((err) => { 
        logger.error(err);
      });
  }

  useEffect(() => {
    // This should execute only once, at the component load
    logger.info(`Surfly Widget for WxCC component version: ${componentVersion}`);
  }, []);

  useEffect(() => {
    // This should execute every time Dark Mode is changed in WxCC desktop
    if(props.isDarkMode){
      setDarkMode(props.isDarkMode);
    }
  }, [props.isDarkMode]);

  useEffect(() => {
    if(props.agentName) {
        logger.debug(`setAgentName...`);
        setAgentName(props.agentName);
    }
  }, [props.agentName]);

  useEffect(() => {
    if(props.agentEmailId){
      logger.debug(`setAgentEmailId...`);
      setAgentEmailId(props.agentEmailId);
    }
  }, [props.agentEmailId]);

  useEffect(() => {
    if(darkMode){
      logger.debug(`darkMode set to: ${darkMode}`);
     }
  }, [darkMode]);

  useEffect(() => {
    if(agentName && agentEmailId){
      logger.info(`agentName set to: ${agentName}`);
      logger.info(`agentEmailId set to: ${agentEmailId}`);
      getSurflyData(agentName, agentEmailId);
    }
  }, [agentName, agentEmailId]);

  useEffect(() => {
    if(surflyAgentId && surflyAgentToken){ 
      logger.info(`surflyAgentId set to: ${surflyAgentId}`);
      logger.info(`surflyAgentToken set to: ${surflyAgentToken}`); 
      cheeckActiveSession(surflyAgentId);
    }
  }, [surflyAgentId, surflyAgentToken]);

  useEffect(() => {
    if(pin){
      logger.info(`pin set to: ${pin}`);
    }
  }, [pin]);

  return (
    <div >
      { mounted ?
        <div>
          { pin ?
            <div>
              <iframe title="Surfly" src={`https://app.surfly.com/embed/start/?agent_token=${surflyAgentToken}&url=${pin}`} frameBorder="0" height="900" width="100%" allow="camera *;microphone *" ></iframe>
            </div>
          : <div>
              <iframe title="Surfly" src={`https://app.surfly.com/embed/start/?agent_token=${surflyAgentToken}`} frameBorder="0" height="900" width="100%" allow="camera *;microphone *" ></iframe>
            </div>
          }
        </div>
      : null
      }
    </div>
  );
};

export default App;
