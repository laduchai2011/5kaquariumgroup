import React from 'react';
import './style.css';
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

const MyChart: React.FC = () => {
    const data =[
        { id: 0, value: 10, label: "Apple" },
        { id: 1, value: 15, label: "Banana" },
        { id: 2, value: 20, label: "Cherry" },
        { id: 4, value: 20, label: "Cherry1" },
        { id: 5, value: 20, label: "Cherry2" },
    ]

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "value", headerName: "value", width: 200 },
        { field: "label", headerName: "label", type: "number", width: 100 }
    ];

    return (
        <div className="Home-MyChart">
            <h2>Tình hình doanh số</h2>
            <div className='Home-MyChart-compareContainer'>
                <div>
                    <PieChart
                        series={[
                            {data: data},
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
                <div>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSizeOptions={[5]}
                        initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyChart;
