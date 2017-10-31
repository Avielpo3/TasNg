import { SortByOptions } from '../sort-by.enum';

export interface SortByDto {
    filterByArray: SortByFilterArray[];
    IsVisible: boolean;
    Name: string;
    Options?: NgPrimeDropdwonOptions;
}

export interface SortByFilterArray {
    label: string;
    value: SortByOptions;
}

export interface NgPrimeDropdwonOptions {
    options?: any[];
    scrollHeight?: string;
    style?: string;
    panelStyle?: string;
    styleClass?: string;
    panelStyleClass?: string;
    filter?: boolean;
    filterBy?: string;
    filterPlaceholder?: string;
    autoWidth?: boolean;
    required?: boolean;
    disabled?: boolean;
    editable?: boolean;
    appendTo?: any;
    tabindex?: number;
    placeholder: string;
    inputId?: string;
    dataKey?: string;
    lazy?: boolean;
    autofocus?: boolean;
    resetFilterOnHide?: boolean;
}

// Styling options

/*
    ui-dropdown	                    Container element.
    ui-dropdown-label      	        Element to display label of selected option.
    ui-dropdown-trigger	            Icon element.
    ui-dropdown-panel	            Icon element.
    ui-dropdown-items-wrapper	    Wrapper element of items list.
    ui-dropdown-items	            List element of items.
    ui-dropdown-item	            An item in the list.
    ui-dropdown-filter-container	Container of filter input.
    ui-dropdown-filter	            Filter element.
    ui-dropdown-open	            Container element when overlay is visible.
*/

// https://www.primefaces.org/primeng/#/theming

/*

options	array	null	                    An array of selectitems to display as the available options.
scrollHeight	string                   	200px	Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
style	string	null	                    Inline style of the element.
panelStyle	string	null	                Inline style of the overlay panel element.
styleClass	string	null	                Style class of the element.
panelStyleClass	string	null            	Style class of the overlay panel element.
filter	boolean	false	                    When specified, displays an input field to filter the items on keyup.
filterBy	string	null                	When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
filterPlaceholder	string	null        	Placeholder text to show when filter input is empty.
autoWidth	boolean	true	                Calculates the width based on options width, set to false for custom width.
required	boolean	false	                When present, it specifies that an input field must be filled out before submitting the form.
disabled	boolean	false	                When present, it specifies that the component should be disabled.
editable	boolean	false	            When present, custom value instead of predefined options can be entered using the editable input field.
appendTo	any	null	        Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element.
tabindex	number	null	            Index of the element in tabbing order.
placeholder	string	null            	Default text to display when no option is selected.
inputId	string	null	                Identifier of the focus input to match a label defined for the dropdown.
dataKey	string	null	                A property to uniquely identify a value in options.
lazy	boolean	true	                When enabled, creates the dom for options when overlay panel gets visible.
autofocus	boolean	false           	When present, it specifies that the component should automatically get focus on load.
resetFilterOnHide	boolean	false	    Clears the filter value when hiding the dropdown.


*/
