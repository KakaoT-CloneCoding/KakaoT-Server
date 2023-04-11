import { SetMetadata } from '@nestjs/common';


export enum Role {
    All = "all",
    Driver = "Driver",
    Client = "Client",
}


export const Roles = (...roles) => SetMetadata('roles', roles);