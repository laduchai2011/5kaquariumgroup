import React from 'react';
import './style.css';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";


const SalerRank: React.FC = () => {
     const items = [
        { id: 1, name: "Nguyễn Văn A" },
        { id: 2, name: "Trần Thị B" },
        { id: 3, name: "Lê Văn C" },
    ];
    return (
        <div className="Home-SalerRank">
            <h2>Xếp hạng người bán</h2>
            <div>
                <Paper style={{ maxWidth: 300 }}>
                    <List>
                        {items.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                        ))}
                    </List>
                </Paper>
            </div>
        </div>
    );
};

export default SalerRank;
