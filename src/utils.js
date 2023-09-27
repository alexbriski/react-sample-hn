export const getTimeDiffFromNow = (time) => {
  const now = new Date();
  const diff = now - time * 1000;
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  if (diffInMinutes > 59) {
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    if (diffInHours > 23) {
      const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      return `${diffInDays} ${diffInDays > 1 ? "days" : "day"} ago`;
    } else {
      return `${diffInHours} ${diffInHours > 1 ? "hours" : "hour"} ago`;
    }
  } else {
    return `${diffInMinutes} ${diffInMinutes > 1 ? "minutes" : "minute"} ago`;
  }
};
