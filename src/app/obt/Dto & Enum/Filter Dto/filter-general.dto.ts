import { FilterNameEnum } from './filter-name.enum';


export interface FilterDto {
    name: FilterNameEnum;
    isVisible: boolean;
    ngPrimeOptions: NgPrimeScrollOptions;
}

export interface NgPrimeScrollOptions {
    animate: boolean;
    min: number;
    max: number;
    range: boolean;
    step: number;
    orientation: string;
    style: string;
    styleClass: string;
    disabled: boolean;
}

