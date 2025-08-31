export type scroll_control_type = {
    isScroll: boolean;
    clientX: number;
    scroll_pos: number;
    min_pos: number;
    max_pos: number;
};

export interface table_option {
    width_index: number;
    width: number;
    widthFull: number;
    pos_x: number;
}

export type context_type = {
    myTable: table_option;
};
