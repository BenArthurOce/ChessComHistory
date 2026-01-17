// Spinner.js
import React from "react";
import styled, { keyframes } from "styled-components";

// --- Spin animation ---
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// --- Spinner styles ---
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const SpinnerCircle = styled.div`
  border: ${(props) => props.thickness || "4px"} solid ${(props) => props.color || "#ccc"};
  border-top: ${(props) => props.thickness || "4px"} solid ${(props) => props.colorTop || "#1d72b8"};
  border-radius: 50%;
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  animation: ${spin} 1s linear infinite;
`;

const SpinnerText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => props.color || "#333"};
`;

// --- Spinner component ---
const TestSpinner = ({ size, thickness, color, colorTop, text }) => {
  return (
    <SpinnerWrapper>
      <SpinnerCircle size={size} thickness={thickness} color={color} colorTop={colorTop} />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerWrapper>
  );
};

export default TestSpinner;
