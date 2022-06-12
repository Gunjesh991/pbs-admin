import { useEffect, useMemo, useState } from "react";

const _schemes = {
  anniversary: [
    [5500, 4000],
    [13000, 9000],
    [15000, 10000],
    [25000, 15000],
    [40000, 20000],
  ],
  "bachelorette-party": [
    [5500, 4000],
    [13000, 9000],
    [15000, 10000],
    [25000, 15000],
    [40000, 20000],
  ],
  birthday: [
    [5500, 4000],
    [13000, 9000],
    [15000, 10000],
    [25000, 15000],
    [40000, 20000],
  ],
  "bride-to-be": [
    [5500, 4000],
    [13000, 9000],
    [15000, 10000],
    [25000, 15000],
    [40000, 20000],
  ],
  wedding: [
    [7500, 7500],
    [17500, 17500],
    [20000, 20000],
    [25000, 25000],
    [30000, 30000],
  ],
  "wedding-photoshoot": [
    [5500, 4000],
    [13000, 8500],
    [15000, 10000],
    [15000, 15000],
    [25000, 15000],
  ],
};

const LOCAL_ESTIMATION_DATA_KEY = "estimation";

const useEstimate = () => {
  const [estimationObj, setEstimationObj] = useState(() => ({
    eventType: "",
    eventDuration: "",
    cameraCount: 1,
    videoCount: 0,
  }));

  useEffect(() => {
    const getLocalEstimated = () => {
      try {
        const estimatedSaved = localStorage.getItem(LOCAL_ESTIMATION_DATA_KEY);
        if (!estimatedSaved) return;
        const estimated = JSON.parse(estimatedSaved);
        setEstimationObj(estimated);
      } catch (err) {}
    };

    getLocalEstimated();
  }, []);

  const saveEstimation = () => {
    localStorage.setItem(
      LOCAL_ESTIMATION_DATA_KEY,
      JSON.stringify(estimationObj)
    );
  };

  const updateEstimationObj = (field = "", value) => {
    setEstimationObj({
      ...estimationObj,
      [field]: value,
    });
  };

  const estimation = useMemo(() => {
    const typeData = _schemes[estimationObj.eventType];
    if (!typeData) return 0;
    const typeDurationData = typeData[estimationObj.eventDuration];
    if (!typeDurationData) return 0;
    return (
      estimationObj.cameraCount * typeDurationData[0] +
      estimationObj.videoCount * typeDurationData[1]
    );
  }, [estimationObj]);

  return {
    estimation,
    estimationObj,
    updateEstimationObj,
    saveEstimation,
  };
};

export default useEstimate;
