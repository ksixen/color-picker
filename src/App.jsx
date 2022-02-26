import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ColorPalets = styled.div`
  z-index: 1001;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  padding: 0 20px;
  bottom: 0;
`;
const Background = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  perspective: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  mix-blend-mode: darken;
  background-color: ${(props) =>
    `rgb( ${props.red + ", " + props.green + ", " + props.blue})`};
`;
const App = () => {
  const rangeRed = useRef();
  const rangeGreen = useRef();
  const rangeBlue = useRef();

  const [red, setRed] = useState(0.1);
  const [green, setGreen] = useState(0.1);
  const [blue, setBlue] = useState(0.1);

  useEffect(() => {
    if (red === 0.1 || green === 0.1 || blue === 0.1) {
      function getRandomInt(max) {
        return Math.floor(Math.random() * 255);
      }

      setRed(getRandomInt(255));
      setGreen(getRandomInt(255));
      setBlue(getRandomInt(255));
    }
  }, [red, green, blue]);

  const onRangeChange = (e) => {
    switch (e.target.title) {
      case "red":
        setRed(rangeRed.current.valueAsNumber);
        break;
      case "green":
        setGreen(rangeGreen.current.valueAsNumber);
        break;
      case "blue":
        setBlue(rangeBlue.current.valueAsNumber);
        break;
      default:
        break;
    }
  };

  function ColorToHex(color) {
    const hex = color.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  const rgbToHex = (r, g, b) => {
    return "#" + ColorToHex(r) + ColorToHex(g) + ColorToHex(b);
  };
  return (
    <div>
      <ColorPalets>
        <div className="range-group">
          <input
            className="form-range w-auto"
            type="range"
            max="255"
            ref={rangeRed}
            onChange={(e) => onRangeChange(e)}
            title="red"
            value={red}
          />
          <input
            className="form-range w-auto"
            type="range"
            max="255"
            ref={rangeGreen}
            onChange={(e) => onRangeChange(e)}
            value={green}
            title="green"
          />
          <input
            className="form-range w-auto"
            type="range"
            max="255"
            ref={rangeBlue}
            onChange={(e) => onRangeChange(e)}
            title="blue"
            value={blue}
          />
        </div>
      </ColorPalets>
      <Background red={red} green={green} blue={blue}>
        <p className="bg-color">
          RGB: {red}, {green}, {blue}
        </p>
        <p className="bg-color">HEX: {rgbToHex(red, green, blue)}</p>
      </Background>
    </div>
  );
};

export default App;
