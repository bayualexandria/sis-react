import { useState, useEffect } from "react";

function Network() {
  const [online, setOnline] = useState(navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    setShowOnline(true);
    setTimeout(() => {
      setShowOnline(false);
    }, 5000);
    setShowOffline(true);
    setTimeout(() => {
      setShowOffline(false);
    }, 5000);
    // Update network status
    const handleStatusChange = () => {
      setOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [online]);
  return (
    <div className="w-ful">
      {online ? (
        showOnline ? (
          <div className="flex justify-center items-center p-1 bg-green-500 w-full text-white text-xs font-normal online">
            Online
          </div>
        ) : (
          ""
        )
      ) : showOffline ? (
        <div className="flex justify-center items-center p-1 bg-red-500 w-full text-white text-xs font-normal offline">
          Offline
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Network;
