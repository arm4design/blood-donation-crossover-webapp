export interface Donor {
    _id?: number;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    bloodGroup: string;
    ip: string;
    country: string;
    city: string;
    region: string;
    zipCode: number;
    geo: {
        type: string,
        coordinates: [number]
    }
}
