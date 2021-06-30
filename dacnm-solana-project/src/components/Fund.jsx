import React, { useState } from "react";
import { Alert, Button, Space, Col, Input, Typography } from 'antd';
import { Connection, PublicKey } from "@solana/web3.js";

const { Text } = Typography;
const DECIMAL_OFFSET = 1000000000;

const Fund = () => {
  const [isFunded, setIsFunded] = useState(false);
  const [value, setValue] = useState("");

  const fund = () => {
    const url = "https://api.devnet.solana.com";
    const connection = new Connection(url);
  
    const address = new PublicKey(value);
  
    connection.requestAirdrop(address, 1000000000)
      .then((res) => setIsFunded(true))
      .catch((err) => console.log(err))

  }
  //Checked
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated (you can copy it in the top right corner of the page):</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={fund}>Fund this address</Button>
        </Space>
        {/* Display message if isFunded == true */}
        {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" showIcon />}
        {/* {!isFunded && <Alert message={<Text strong>Address not Funded!</Text>} type="error" showIcon />} */}
      </Space>
    </Col>
  );
}

export default Fund