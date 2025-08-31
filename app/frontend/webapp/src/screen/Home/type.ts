import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import { ProductField } from '@src/dataStruct/product';

export interface ProductContextInterface {
    products: ProductField[],
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
    selectedFishCodeId: number,
    setSelectedFishCodeId: React.Dispatch<React.SetStateAction<number>>
}