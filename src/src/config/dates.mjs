import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

dayjs().format();

export const formateTimeFrom = (date) => dayjs(date).fromNow();
