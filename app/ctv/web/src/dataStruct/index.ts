export interface accountOption {
    id: number | null; // not use in signup
    userName: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    status: string;
    updateTime: string; // not use in signup
}
