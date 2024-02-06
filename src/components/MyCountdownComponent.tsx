import Countdown, { CountdownRenderProps } from "react-countdown";
import { type FC } from "react";

type MyCountdownComponentProps = {
  endTime: Date;
};

const MyCountdownComponent: FC<MyCountdownComponentProps> = ({ endTime }) => {
  const targetDate = new Date(endTime).getTime();
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return <span className="counter--complete"> 0 d | 0 h | 0 m | 0 s</span>;
    } else {
      return (
        <span className="counter--active">
          {days} d | {hours} h | {minutes} m | {seconds} s
        </span>
      );
    }
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};

export default MyCountdownComponent;
