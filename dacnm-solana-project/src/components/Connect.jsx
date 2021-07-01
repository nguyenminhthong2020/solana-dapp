import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getNodeRpcURL } from "../lib/utils";
import { Alert, Col, Space, Typography } from "antd";
import { Connection } from "@solana/web3.js";

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = getNodeRpcURL();
    
    // Create a connection
    const connection = new Connection(url);

    // Get the API version
    connection.getVersion()
    .then(version => {
    // and save it to the component's state  
    setVersion(version);
    })
    .catch(error => console.log(error))
  }

  return (
    <ConnectWrapper>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Solana
            <Text code>v{version["solana-core"]}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Solana" type="error" showIcon />}
    </ConnectWrapper>
  );
}

const ConnectWrapper = styled(Col)`
  width: 40%;
  margin: auto;
`;



export default Connect