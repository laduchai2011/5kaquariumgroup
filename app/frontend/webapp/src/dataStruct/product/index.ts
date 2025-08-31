export interface ProductField {
    id: number;
    title: string;
    image: string;
    name: string;
    size: string;
    amount: string;
    sold: string;
    discount: string;
    fishCodeInProduct: string;
    price: string;
    status: string;
    userId: number;
    fishCodeId: number;
    updateTime: string;
    createTime: string;
}

export interface PagedProductField {
    items: ProductField[],
    totalCount: number
}

// export interface ProductFilterField {
//     fishCodeId: number;
// }