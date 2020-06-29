import { format, addSeconds } from 'date-fns';

export default function parseTime(seconds) {
	return format(addSeconds(new Date(0), seconds), seconds < 3600 ? 'mm:ss' : 'hh:mm:ss')
}