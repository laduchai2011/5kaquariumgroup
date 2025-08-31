export interface HeaderLeftState {
    isShow: boolean,
    headerSelected: HeaderSelected
}

export enum HeaderSelections {
    HOME,
    PRODUCT,
    LIST,
    MY_ORDER,
    PROFILE,
    ABOUT5K
}

export type HeaderSelected = HeaderSelections;