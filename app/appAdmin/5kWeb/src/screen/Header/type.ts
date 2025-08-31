export const select_options = {
    HOME: 'HOME',
    ORDER: 'ORDER',
    LIST: 'LIST'
} as const;
// export type select_options = (typeof select_consts)[keyof typeof select_consts];

export type select_type = typeof select_options.HOME | typeof select_options.ORDER | typeof select_options.LIST;

export interface global_state {
    selected: select_type;
}
