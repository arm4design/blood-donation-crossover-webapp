import { Component } from '@angular/core';
import { DonorComponent } from './donor.component';
import { DonorService } from './donor.service';
import { Donor } from './donor.interface';

@Component({
    selector: 'donor-detail',
    templateUrl: './donor.component.detail.html',
    styleUrls: ['./donor.component.detail.scss'],
    providers: [DonorService]
})
export class DonorDetailComponent extends DonorComponent {
    readonly title: string = 'Donor Details';
    public submitted: boolean;
    public isError: boolean;
    public blockForm: boolean;
    public message: string;
    public donorUrl: string;
    public errorMessage: string;

    constructor(service: DonorService) {
        super(service);
        this.getDonorData();
    }

    getDonorData() {
        this.service.getSubscription(location.pathname.split('/')[2]).subscribe(
            response => {
                if (response.data) {
                    this.donor = response.data
                    if (this.donor.contactNumber.toString()[0] !== '+' && this.donor.contactNumber.toString().substring(0,2) !== '00')
                        this.donor.contactNumber = '+' + this.donor.contactNumber;
                } else {
                    location.pathname = 'home';
                }
            },
            error => {
                debugger;
            }
        );
    }

    submit(form) {
        this.submitted = true;
        this.isError = false;

        if (form.invalid)
            return;

        this.service.getUserInfo().subscribe(
            response => {
                this.donor.ip = response.ip;
                this.donor.country = response.country;
                this.donor.city = response.city;
                this.donor.country = response.country_name;
                this.donor.region = response.region_name;
                this.donor.zipCode = response.zip_code;
                this.donor.geo.coordinates = [response.longitude, response.latitude];
                this.service.updateSubscription(this.donor).subscribe(
                    response => {
                        if (response.status === 'error') {
                            this.isError = true;
                            this.message = response.message;
                        } else {
                            this.message = response.message + '. Use this URL to update or delete your donor information: ';
                            this.donorUrl = location.href;
                        }
                    },
                    error => this.errorMessage = <any>error
                )
            },
            error =>  this.errorMessage = <any>error
        );
    }

    remove() {
        this.service.removeSubscription(this.donor._id).subscribe(
            response => location.pathname = 'home',
            error => error =>  this.errorMessage = <any>error
        );
    }

}
