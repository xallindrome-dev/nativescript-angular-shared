import { Injectable } from "@angular/core";
import { alert } from 'tns-core-modules/ui/dialogs';

@Injectable({ providedIn: 'root' })
export class DialogService {
    alert(message: string) {
        alert(message);
    }
}