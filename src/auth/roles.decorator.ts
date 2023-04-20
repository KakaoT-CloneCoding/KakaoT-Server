import { SetMetadata } from '@nestjs/common';

// @Roles("" < = 이 부분이 타입 추론 되게 수정해야함)
export enum Role {
    All = "all",
    Driver = "Driver",
    Client = "Client",
}


export const Roles = (...roles) => SetMetadata('roles', roles);