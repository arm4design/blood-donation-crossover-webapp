import { DonorService } from './donor.service';
import { Donor } from './donor.interface';

export class DonorComponent {
    readonly title: string;
    public donor: Donor = {
        firstName: '',
        lastName: '',
        contactNumber: '',
        emailAddress: '',
        bloodGroup: '',
        ip: '',
        country: '',
        city: '',
        region: '',
        zipCode: 0,
        geo: {
            type: 'Point',
            coordinates: [0,0]
        }
    };
    public service: DonorService;

    constructor(service: DonorService) {
        this.service = service;
    }
}
