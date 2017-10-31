export interface PrimeNgPopup {
    header: string;
    content: string;
    draggable?: boolean;
    resizable?: boolean;
    width?: number;
    height?: number;
    minWidth?: number;
    contentStyle?: {};
    isBackgrondBlocked: boolean;
    closeOnEscape?: boolean;
    clickModalBackgroundToEscape?: boolean;
    rtl?: boolean;
    closable?: boolean;
    responsive?: boolean;
    breakpoint?: number;
    appendTo: string;
    style?: string;
    styleClass?: string;
    showHeader?: boolean;
    positionLeft?: number;
    positionTop?: number;
    visible: boolean;
}
