import React from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import styled from 'styled-components';
import { Keypair } from "@solana/web3.js";

const { Text } = Typography;

const Account = ({ keypair, setKeypair }) => {
  const generateKeypair = () => {
    const keypair = Keypair.generate();
    setKeypair(keypair);
  }

  // parse the address (as a string) from the keypair object
  const publicKeyStr = keypair && keypair.publicKey.toString();

  return (
    <Col>
      <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>Generate a Keypair</Button>
      {keypair &&
        <Col>
          <Space direction="vertical">
            <Alert
              message={
                <Space>
                  <Text strong>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <Text>Open the JS console to inspect the Keypair.</Text>
                  <div>
                    This is the string representation of the public key
                    <KeyText code>{publicKeyStr}</KeyText>.
                  </div>
                  <Text>It's accessible (and copyable) at the top right of this page.</Text>
                </div>
              }
              type="success"
              showIcon
            />
          </Space>
        </Col>
      }
    </Col>
  );
}

const KeyText = styled(Text)`
  font-size: 100%;
`;

export default Account