export interface HeaderLeftState {
    isShow: boolean,
    headerSelected: HeaderSelected
}

export enum HeaderSelections {
    HOME,
    EVENT,
    LIVE,
    MY_LIVE,
    PROFILE
}

export type HeaderSelected = HeaderSelections;