import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeActionsComponent } from "./challenge-actions.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [CommonModule],
    exports: [ChallengeActionsComponent]
})

export class ChallengeActionsModule { }