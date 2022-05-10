import { useEffect, useState } from "react";
import { status } from "../../config";
import { timeTillMidnight } from "../../utils";
import styled from "styled-components";
import { SectionLabel } from "./StatsModal";

const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  color: white;
  font-weight: bold;
  background-color: ${status.green};
  z-index: 100;
`;

const StatsModalFooter = ({ close, reset }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(timeTillMidnight());
    const setTimeTillMidnight = () => {
      const t = timeTillMidnight();
      setTime(t);
    };
    const interval = setInterval(setTimeTillMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.length === 0) return null;

  return (
    <div style={{ display: "flex", paddingTop: "10px", width: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionLabel>Next Trumple</SectionLabel>
        {time}
      </div>
      <div style={{ border: "1px solid black", margin: "0 10px" }} />
      <Button
        onClick={() => {
          close();
          reset();
        }}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default StatsModalFooter;
