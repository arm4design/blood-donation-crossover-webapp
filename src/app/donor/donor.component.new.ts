import { Component } from '@angular/core';
import { DonorService } from './donor.service';
import { DonorComponent } from './donor.component';
import { Donor } from './donor.interface';

@Component({
    selector: 'donor-new',
    templateUrl: './donor.component.new.html',
    styleUrls: ['./donor.component.new.scss'],
    providers: [DonorService]
})
export class DonorNewComponent extends DonorComponent {
    readonly mapType: string = 'donor';
    readonly title: string = 'Donor Subscription';
    public displayPopup: boolean = false;
    public submitted = false;
    public errorMessage: any;
    public isError: boolean = false;
    public message: string;
    public donorUrl: string;
    public blockForm: boolean = false;
    public clearMapGraphics: boolean = false;

    constructor(service: DonorService) {
        super(service);
    }

    onDonorAdded(event) {
        this.donor.geo.coordinates = event;
        this.showPopup();
    }

    showPopup() {
        this.displayPopup = true;
    }

    hidePopup() {
        this.displayPopup = false;
        this.clearMapGraphics = true;
    }

    submitPopup(form) {
        this.submitted = true;
        this.isError = false;

        if (form.invalid)
            return;

        this.service.getUserInfo().subscribe(
            response => {
                this.donor.ip = response.ip;
                this.donor.city = response.city;
                this.donor.country = response.country_name;
                this.donor.region = response.region_name;
                this.donor.zipCode = response.zip_code;
                this.service.postSubscription(this.donor).subscribe(
                    response => {
                        if (response.status === 'error') {
                            this.isError = true;
                            this.message = response.message;
                        } else {
                            this.blockForm = true;
                            this.message = response.message + '. Use this URL to update or delete your donor information: ';
                            this.donorUrl = location.href + '/' + response.data.id;
                        }
                    },
                    error => this.errorMessage = <any>error
                )
            },
            error =>  this.errorMessage = <any>error
        );
    }

}
