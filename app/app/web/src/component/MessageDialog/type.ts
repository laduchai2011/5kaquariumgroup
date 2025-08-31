export interface MessageDataInterface {
    message: string,
    type: 'error' | 'warn' | 'success' | 'normal',
}

export interface MessageInterface {
    message: string,
    type: 'error' | 'warn' | 'success' | 'normal',
    onClose?: () => void
}