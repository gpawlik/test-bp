import { format } from "date-fns";

import { messages } from "./intl";

export const getLastUpdated = (lastUpdated?: number) => ({
  ...messages.date,
  values: { date: lastUpdated ? format(lastUpdated, "MM/dd/yy") : "-" },
});
