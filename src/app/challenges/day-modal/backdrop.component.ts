import { Component } from "@angular/core";

@Component({
    selector: 'ns-backdrop',
    template: '<div class ="backdrop"></div>',
    styles: [
        `
            .backdrop {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 50;
                background: rgba(0, 0, 0, 0.75);
            }
        `
    ]
})
export class BackdropComponent {

}