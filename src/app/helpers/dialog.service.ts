import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DialogService {
    alert(message: string) {
        alert(message);
    }
}