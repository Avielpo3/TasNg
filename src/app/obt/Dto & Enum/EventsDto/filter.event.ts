import { FilterNameEnum } from './../Filter Dto/filter-name.enum';

export interface FilterEvent {
    sender: FilterNameEnum;
    values: { min: any, max: any };
}
