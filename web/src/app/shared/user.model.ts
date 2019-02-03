import { Address } from './address.model';

export class User {
    
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    roles: string[];
    birthday: Date;
    about: string;

    constructor() {
        
    }
}
