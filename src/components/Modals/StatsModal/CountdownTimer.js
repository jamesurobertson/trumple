import { useEffect, useState } from "react";
import { timeTillMidnight } from "../../../utils";

const CountdownTimer = () => {
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

  return time;
};

export default CountdownTimer;
