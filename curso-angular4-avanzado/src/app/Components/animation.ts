import {trigger, state, style, transition, animate} from '@angular/animations';


export const fadein =
                trigger('fadein', [
                    transition(':enter', [
                     style({
                        opacity: 0,
                        transform: 'translateY(-35%)'
                    }),
                    animate('500ms linear', style({
                        opacity: 0,
                        transform: 'translateY(0)'
                    }))
                    ])
                ]);

