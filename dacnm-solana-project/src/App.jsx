import React, { useState } from 'react';
import styled from "styled-components";
import Step from "./components/Step";
import './App.css';

const Wrapper = styled.div `
  text-align: center;
  background-image: url('background.png');
  color: white;
`;

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const next = () => setStepIndex(stepIndex + 1);
  const prev = () => setStepIndex(stepIndex - 1);

  return (
    <Wrapper>
      <Step stepIndex={stepIndex} prev={prev} next={next} />
    </Wrapper>
  );
}

export default App;
