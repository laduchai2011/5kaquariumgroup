export interface FishCodeField {
    id: number;
    name: string;
    size: string;
    amount: string;
    price: string;
    detail: string;
    status: string;
    userId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedFishCodeField {
    items: FishCodeField[],
    totalCount: number
}

export interface FishCodeForFilterField {
    id: number;
    name: string
}