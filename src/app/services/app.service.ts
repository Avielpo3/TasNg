import { Injectable, EventEmitter } from '@angular/core';
import { PrimeNgPopup } from '../obt/Dto & Enum/PrimeNgDto/Popup.dto';

@Injectable()
export class AppService {
    _popup: PrimeNgPopup = { header: 'Error', content: '', appendTo: 'body', isBackgrondBlocked: true, visible: false };

    private _onAngularStarted = new EventEmitter<boolean>();
    public get OnAngularStarted(): EventEmitter<boolean> {
        return this._onAngularStarted;
    }

    private _onShowPopup = new EventEmitter<PrimeNgPopup>();
    public get OnShowPopup(): EventEmitter<PrimeNgPopup> {
        return this._onShowPopup;
    }

    public StartAngular(): void {
        const startAngular: boolean = true;
        this.OnAngularStarted.next(startAngular);
    }

    public showPopup(content: string, header: string, visible: boolean, isBackgrondBlocked = true, appendTo = 'body'): void {
        this._popup.content = content;
        this._popup.header = header;
        this._popup.isBackgrondBlocked = isBackgrondBlocked;
        this._popup.appendTo = appendTo;
        this._popup.visible = visible;

        this.OnShowPopup.next(this._popup);
    }
}
