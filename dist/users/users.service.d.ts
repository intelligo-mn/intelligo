export declare type User = any;
export declare class UsersService {
    private readonly users;
    constructor();
    findOne(username: string): Promise<User | undefined>;
}
