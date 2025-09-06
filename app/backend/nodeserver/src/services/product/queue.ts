import { consumeTasks } from "@src/queueRedis/consumer";
// import { produceTask } from "@src/queueRedis/producer";
import { OrderField } from "@src/dataStruct/order";
// import { mssql_server } from '@src/connect';
// import QueryDB_Get_AProductWithId from "./queue/GetAProductWithId";
// import MutateDB_OrderUpdateChangeProductAmount from "./queue/ChangeAmount";
// import { my_log } from "@src/log";

const queue = () => {
    consumeTasks<OrderField>('addOrder-to-provider', async (data) => {
        // console.log(11111111, data)
        // const queryDB_get_aProductWithId = new QueryDB_Get_AProductWithId();
        // const mutateDB_orderUpdateChangeProductAmount = new MutateDB_OrderUpdateChangeProductAmount();
        // const conn = mssql_server.get_connectionPool();
        // if (conn) {
        //     queryDB_get_aProductWithId.set_connection_pool(conn);
        //     mutateDB_orderUpdateChangeProductAmount.set_connection_pool(conn)
        // } else {
        //     my_log.withRed('consumeTasks in addOrder-to-provider connect DB failure !')
        // }
        // queryDB_get_aProductWithId.setId(data.productId)
        // mutateDB_orderUpdateChangeProductAmount.set_id(data.productId)
        // const result = await queryDB_get_aProductWithId.run();
        // if (result?.recordset.length && result?.recordset.length > 0) {
        //     const product = result.recordset[0];
        //     const amountProduct = Number(product.amount);
        //     const amountOrder = Number(data.amount)
        //     if (amountOrder < amountProduct) {
        //         const newAmountProduct = amountProduct - amountOrder;
        //         mutateDB_orderUpdateChangeProductAmount.set_newAmount(newAmountProduct.toString())
        //         mutateDB_orderUpdateChangeProductAmount.run();
        //     } else {
        //         produceTask<OrderField>('order-failure', data)
        //     }
        // } else {
        //     my_log.withRed('consumeTasks in addOrder-to-provider get_aProductWithId failure !')
        // }
    })
}


export default queue;