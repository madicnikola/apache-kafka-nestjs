import * as dayjs from 'dayjs';
// Add any plugins you want to use with DayJS
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek);

export default dayjs;
