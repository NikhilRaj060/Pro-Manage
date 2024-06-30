import { useCallback } from "react";
import dayjs from "dayjs";

const useFormattedDate = () => {
  const getDaySuffix = useCallback((day) => {
    if (day > 3 && day < 21) return "th"; // Handle 11th, 12th, 13th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }, []);

  const formatDate = useCallback((dateString,withYear = false) => {

    const date = dayjs(dateString);
    const day = date.date();
    const month = date.format("MMMM");
    const year = date.format("YYYY");
    const suffix = getDaySuffix(day);

    return withYear ? `${day}${suffix} ${month} ${year}` : `${month} ${day}${suffix}`;
  }, [getDaySuffix]);

  return formatDate;
};

export default useFormattedDate;
