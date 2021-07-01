import React, { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import styled from 'styled-components';
import { Connection, PublicKey } from "@solana/web3.js";
import { getNodeRpcURL } from "../lib/utils";


const { Text } = Typography;

const DECIMAL_OFFSET = 1000000000;

const Balance = () => {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(null);

  const getBalance = () => {
    const url = getNodeRpcURL();
    const connection = new Connection(url);

    const publicKey = new PublicKey(value);

    connection.getBalance(publicKey)
    .then((balance) => {
      setBalance(balance / DECIMAL_OFFSET);
    })
    .catch((error) => {
      console.log(error);
      setBalance(null);
    });
  }

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <BalanceText>Paste the address you generated previously:</BalanceText>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getBalance}>Check Balance</Button>
        </Space>
        {balance !== undefined && balance !== null &&
          <WrapperAlert message={`This address has a balance of ◎${balance}`} type="info" />
        }
      </Space>
    </Col>
  );
}

const BalanceText = styled(Text)`
  color: white;
`;

const WrapperAlert = styled(Alert)`
  font-size: 16px;
  font-style: bold;
`;

export default Balance