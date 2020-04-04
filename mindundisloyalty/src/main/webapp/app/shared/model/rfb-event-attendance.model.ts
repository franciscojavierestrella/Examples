import { Moment } from 'moment';

export interface IRfbEventAttendance {
  id?: number;
  attendanceDate?: Moment;
  rfbEventId?: number;
  rfbUserId?: number;
  eventName?: string;
  userLogin?: string;
}

export class RfbEventAttendance implements IRfbEventAttendance {
  constructor(public id?: number, public attendanceDate?: Moment, public rfbEventId?: number, public rfbUserId?: number, public eventName?: string, public userLogin?: string) {}
}
