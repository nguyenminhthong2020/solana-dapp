import React, { useState } from "react"
import { Connection, PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import styled from 'styled-components';
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { LoadingOutlined, RedoOutlined } from '@ant-design/icons';

import { getNodeRpcURL, getTxExplorerURL, getNodeWsURL } from '../lib/utils';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const { Text } = Typography;

const Transfer = ({ keypair }) => {
  const [toAddress, setToAddress] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [txSignature, setTxSignature] = useState(null);

  const generate = () => {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    setToAddress(address);
  }

  const transfer = (values) => {
    const amountNumber = parseFloat(values.amount);
  
    if (isNaN(amountNumber)) {
      setError("Amount needs to be a valid number")
    }
  
    const url = getNodeRpcURL();
    const connection = new Connection(url, { wsEndpoint: getNodeWsURL() });
  
    const fromPubKey = new PublicKey(values.from);
    const toPubKey = new PublicKey(toAddress);
  
    const signers = [
      {
        publicKey: fromPubKey,
        secretKey: new Uint8Array(keypair.secretKey)
      }
    ];
  
    const instructions = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: toPubKey,
      lamports: amountNumber,
    });
    
    const transaction = new Transaction().add(instructions);
  
    setTxSignature(null);
    setFetching(true);
  
    sendAndConfirmTransaction(
      connection,
      transaction,
      signers,
    ).then((signature) => {
      setTxSignature(signature)
      setFetching(false);
    })
    .catch((err) => {
      console.log(err);
      setFetching(false);
    })
  };
  const explorerUrl = getTxExplorerURL(txSignature);

  return (
    <Wrapper
      {...layout}
      name="transfer"
      layout="horizontal"
      onFinish={transfer}
      initialValues={{
        from: keypair.publicKey.toString()
      }}
    > 
      <Form.Item label="Sender" name="from" required style={{ color: 'white'}}>
        <KeyPairText code>{keypair.publicKey.toString()}</KeyPairText>
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="1 lamport = 0.000000001 SOL">
        <Space direction="vertical">
          <Input suffix="lamports" style={{ width: "200px" }} />
        </Space>
      </Form.Item>

      <Form.Item label="Recipient" required>
        <Space direction="horizontal">
          {toAddress && <KeyPairText code>{toAddress}</KeyPairText>}
          <Button size="small" type="dashed" onClick={generate} icon={<RedoOutlined />}>Generate an address</Button>
        </Space>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={fetching}>
          Submit Transfer
        </Button>
      </Form.Item>

      {
        fetching &&
          <Form.Item {...tailLayout}>
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
              <KeyPairText>Transfer initiated. Waiting for confirmations...</KeyPairText>
            </Space>
          </Form.Item>
      }

      {txSignature &&
        <Form.Item {...tailLayout}>
          <Alert
            type="success"
            showIcon
            message={
              <Text strong>Transfer confirmed!</Text>
            }
            description={
              <a href={explorerUrl} target="_blank" rel="noreferrer">View on Solana Explorer</a>
            }
          />
        </Form.Item>
      }
      
      {error &&
        <Form.Item {...tailLayout}>
          <Alert
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError(null)}
          />
        </Form.Item>
      }
    </Wrapper>
  );
};

const Wrapper = styled(Form)`
  width: 50%;
  margin: auto;
  .ant-form-item-required {
    color: white;
    font-style: bold;
    font-size: 16px;
  }

  .ant-form-item-label > label .ant-form-item-tooltip {
    color: white;
  }
`;

const KeyPairText = styled(Text)`
  color: white;
  font-size: 16px;
  font-style: bold;
`;

export default Transfer
