export const timeAgo = (date: Date) => {

  const MONTH_NAME = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const MINUTE = 60;
  const HOUR = 60 * 60;
  const DAY = 24 * 60 * 60;
  const WEEK = 7 * DAY;

  const currentDate = new Date();
  const providedDate = new Date(date + "z");
  const dateYear = providedDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const dateHours = providedDate.getHours();
  const dateMinutes = providedDate.getMinutes();
  const amPm = dateHours >= 12 ? "PM" : "AM";
  const TIME = dateHours + ":" + dateMinutes + " " + amPm;

  let now = currentDate.getTime() / 1000;
  let d = providedDate.getTime() / 1000;
  let diff = now - d;

  if (diff / WEEK >= 1 && dateYear === currentYear) {
    return MONTH_NAME[providedDate.getMonth()] + " " + providedDate.getDay() + " at " + TIME;
  }

  if (diff / WEEK >= 1 && dateYear > 1) {
    return MONTH_NAME[providedDate.getMonth()] + " " + providedDate.getDay() + ", " + dateYear;
  }

  if (diff / DAY >= 1) {
    if (diff / DAY === 2) {
      let ago = "Yesterday at ";
      return ago + TIME
    }
    let time = Math.floor(diff / DAY);
    let ago = "d";
    return time + ago;
  }
  if (diff / HOUR >= 1) {
    let time = Math.floor(diff / HOUR);
    let ago = "h"
    return time + ago;
  }
  if (diff / MINUTE >= 1) {
    let time = Math.floor(diff / MINUTE);
    let ago = "m";
    return time + ago;
  }

  return "now";
};