import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FormService {
    dismiss(inputFields: TextField[]) {
        inputFields.forEach(innf => innf.focus());
        inputFields[inputFields.length - 1].dismissSoftInput();
    }
}