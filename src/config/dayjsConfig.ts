import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from "dayjs/plugin/utc"
import dayjsTimezone  from "dayjs/plugin/timezone"
import isBetween  from "dayjs/plugin/isBetween"

import { timezone } from "@helpers/timezone"

export function dayjsConfig() {
    dayjs.extend(customParseFormat)
    dayjs.extend(localizedFormat)
    dayjs.extend(isBetween)
    dayjs.extend(utc)
    dayjs.extend(dayjsTimezone)
    dayjs.tz.setDefault(timezone)
}