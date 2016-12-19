import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'Blood Donation - Crossover';

    constructor(titleService: Title) {
        titleService.setTitle(this.title);
    }

}
