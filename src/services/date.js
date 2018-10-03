import moment from "moment"
import "moment/locale/es"
moment.locale("es")

export const dateFormatted = date => moment(date).format("LL")
export const hourFormatted = date => moment(date).format("LT")
