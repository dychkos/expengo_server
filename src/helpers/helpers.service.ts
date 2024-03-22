import { Injectable } from '@nestjs/common';
import * as moment from 'moment/moment';

@Injectable()
export class HelpersService {
  public getStartAndEndOfMonth() {
    const firstDayOfMonth = moment().startOf('month');
    const lastDayOfMonth = moment().endOf('month');

    return { firstDayOfMonth, lastDayOfMonth };
  }
}
