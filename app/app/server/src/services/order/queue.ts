import { consumeTasks } from "@src/queueRedis/consumer";
import { mssql_server } from '@src/connect';
import { OrderField } from '@src/dataStruct/order';
import MutateDB_ChangeOrderProcessIsOrder from "./queue/ChangeOrderProcessIsOrder";
import { my_log } from "@src/log";





const queue = () => {
    consumeTasks<OrderField>('order-failure', async (data) => {
        const mutateDB_changeOrderProcessIsOrder = new MutateDB_ChangeOrderProcessIsOrder();
         const conn = mssql_server.get_connectionPool();
        if (conn) {
            mutateDB_changeOrderProcessIsOrder.set_connection_pool(conn);
        } else {
            my_log.withRed('consumeTasks in order-failure connect DB failure !')
        }
        mutateDB_changeOrderProcessIsOrder.set_orderId(data.id);
        mutateDB_changeOrderProcessIsOrder.set_isOrder(false);
        const result = await mutateDB_changeOrderProcessIsOrder.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            my_log.withRed('consumeTasks in order-failure (this order failure) !')
        } else {
            my_log.withBlue('consumeTasks in order-failure (this order success) !')
        }
    })
}


export default queue;