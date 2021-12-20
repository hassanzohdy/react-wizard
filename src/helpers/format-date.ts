import { DateTime } from "luxon";

export default function formatDate(format: string, date = DateTime.now()) {
  return date.toFormat(format);
}
