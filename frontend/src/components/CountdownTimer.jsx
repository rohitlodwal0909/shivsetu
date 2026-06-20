import { useEffect, useRef, useState } from "react";

const CountdownTimer = ({ date, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const [bookingClosed, setBookingClosed] = useState(false);
  const [lastDayWarning, setLastDayWarning] = useState(false);

  const intervalRef = useRef(null);
  const targetRef = useRef(null);

  // set target only when date comes
  useEffect(() => {
    if (!date) return;
    targetRef.current = new Date(date).getTime();
  }, [date]);

  // create interval only once
  useEffect(() => {

    intervalRef.current = setInterval(() => {
      if (!targetRef.current) return;

      const diff = targetRef.current - Date.now();

      if (diff <= 0) {
        setBookingClosed(true);
        onClose?.(true);

        setTimeLeft({
          days: 0,
          hours: 0,
          mins: 0,
          secs: 0,
        });

        clearInterval(intervalRef.current);
        return;
      }

      // LAST 24 HOURS
      setLastDayWarning(diff <= 24 * 60 * 60 * 1000);

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        mins: Math.floor((diff / 60000) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-4 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg border
      ${
        bookingClosed
          ? "bg-gray-600 border-gray-500"
          : lastDayWarning
          ? 'bg-red-600 border-red-500 animate-pulse'
      : 'bg-orange-600 border-orange-500'
      }`}
    >
     <span className="text-xs font-bold uppercase tracking-wide">
  {bookingClosed
    ? 'Booking Closed'
    : lastDayWarning
    ? '⚠ Closing Soon'
    : 'Booking Closes In:'}
</span>

      <div className="flex gap-1.5 text-sm md:text-base font-bold font-mono">
   {!bookingClosed && (
  <div className="flex gap-1.5 text-sm md:text-base font-bold font-mono">
    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.days}d</div> :
    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.hours}h</div> :
    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.mins}m</div> :
    <div className="bg-black/20 rounded px-1.5 py-0.5">{timeLeft.secs}s</div>
  </div>
)}

  </div>
    </div>
  );
};

export default CountdownTimer;