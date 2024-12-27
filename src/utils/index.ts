export function calcTime(time: number | string, formatter: boolean = false, isSecond: boolean = false) {
  let timeStamp = new Date(time);
  if (isSecond) {
    timeStamp = new Date(time as number * 1000);
  }
  // const timeStamp = new Date(time);
  const year = timeStamp.getFullYear();
  const dayOfWeek = timeStamp.getDay();
  const month = timeStamp.getMonth() + 1;
  const day = timeStamp.getDate();
  const hours = timeStamp.getHours();
  const minute = timeStamp.getMinutes();
  const second = timeStamp.getSeconds();

  const monthFormat = month < 10 ? "0" + month : month;
  const dayFormat = day < 10 ? "0" + day : day;
  const hoursFormat = hours < 10 ? "0" + hours : hours;
  const minuteFormat = minute < 10 ? "0" + minute : minute;
  const secondFormat = second < 10 ? "0" + second : second;

  // 返回星期几
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDay = weekDays[dayOfWeek];

  if (formatter) {
    return `${year}-${monthFormat}-${dayFormat} ${hoursFormat}:${minuteFormat}`;
  }

  return `${year}-${monthFormat}-${dayFormat}`;
}