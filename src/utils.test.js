import { getTimeDiffFromNow } from "./utils";

const getTimeDiffFromHoursAgo = (hours) => {
  const now = new Date();
  now.setHours(now.getHours() - hours);
  const time = Math.floor(now.getTime() / 1000);
  return getTimeDiffFromNow(time);
};

test("Returns correct string for time difference", () => {
  expect(getTimeDiffFromHoursAgo(0)).toContain("minute");
  expect(getTimeDiffFromHoursAgo(1)).toBe("1 hour ago");
  expect(getTimeDiffFromHoursAgo(2)).toBe("2 hours ago");
  expect(getTimeDiffFromHoursAgo(25)).toBe("1 day ago");
  expect(getTimeDiffFromHoursAgo(49)).toBe("2 days ago");
});
