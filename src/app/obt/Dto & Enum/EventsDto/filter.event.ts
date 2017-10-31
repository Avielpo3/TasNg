import { FilterNameEnum } from '../filter-name-enum';

export interface FilterEvent {
    sender: FilterNameEnum;
    values: { min: any, max: any };
}
