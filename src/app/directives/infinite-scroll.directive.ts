import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

interface ScrollPosition {
    ScrollHeight: number;
    ScrollTop: number;
    ClientHeight: number;
}

const DefaultScrollPosition: ScrollPosition = {
    ScrollHeight: 0,
    ScrollTop: 0,
    ClientHeight: 0
};

@Directive({
    selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

    private scrollEvent$;
    private userScrolledDown$;
    private requestStream$;
    private requestOnScroll$;

    @Input()
    scrollCallback;

    @Input()
    immediateCallback;

    @Input()
    scrollPercent = 70;

    constructor(private elm: ElementRef) { }

    ngAfterViewInit() {
        this.registerScrollEvent();
        this.streamScrollEvents();
        this.requestCallbackOnScroll();
    }

    private registerScrollEvent(): void {
        this.scrollEvent$ = Observable.fromEvent(this.elm.nativeElement, 'scroll');
    }

    private streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$
            .map((e: any): ScrollPosition => ({
                ScrollHeight: e.target.scrollHeight,
                ScrollTop: e.target.scrollTop,
                ClientHeight: e.target.clientHeight
            }))
            .pairwise()
            .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
    }

    private requestCallbackOnScroll() {

        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$
                .startWith([DefaultScrollPosition, DefaultScrollPosition]);
        }

        this.requestOnScroll$
            .map(() => this.scrollCallback())
            .subscribe(() => { });

    }

    private isUserScrollingDown = (positions: ScrollPosition[]) => {
        return positions[0].ScrollTop < positions[1].ScrollTop;
    }

    private isScrollExpectedPercent = (position: ScrollPosition) => {
        return ((position.ScrollTop + position.ClientHeight) / position.ScrollHeight) > (this.scrollPercent / 100);
    }

}
