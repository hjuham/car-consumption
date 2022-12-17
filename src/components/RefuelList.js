import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material'
import {
    collection,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs
} from 'firebase/firestore'
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import DisplayAverages from './DisplayAverages';
function RefuelList() {
    const [items, setItems] = useState([]);
    const { currentUser } = useAuth()
    useEffect(() => {
        const colRef = collection(db, 'refuels')
        const q = query(colRef, where("uid", "==", currentUser.uid), orderBy('date', 'asc'))
        const fetchData = async () => {
            const refuelSnapshot = await getDocs(q)
            const refuels = refuelSnapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            setItems(refuels)
        }
        fetchData()
    }, [currentUser.uid])
    const removeRefuel = async (e, item) => {
        deleteDoc(doc(db, "refuels", item.id));
        let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
        setItems(filteredArray);
    }
    const columns = [
        { field: 'date', headerName: 'Date', flex:1 },
        { field: 'km', headerName: 'Odometer', flex: 1},
        {field: 'kmsincerefuel', headerName: 'Since last refuel', flex: 1},
        {field: 'liters', headerName: 'Liters', flex:1},
        {field: 'price', headerName: 'Price per liter', flex:1},
        {field: 'cost', headerName: 'Cost (€)', flex:1},
        {field: 'consumption', headerName: 'L/100km', flex:1},
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => removeRefuel(e, params.row)} variant="contained" color="error" startIcon={<Delete/>}>
                        Delete
                    </Button>
                )
            }
        },
    ];

    return (
        <Box sx={{marginLeft: 2, mr: '25%'}}>
            <DisplayAverages refuels={items}></DisplayAverages>
            <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={items} columns={columns} sx={{border: 1}} components={{ Toolbar: GridToolbar }}/>
            </div>
        </Box>
    )
}
export default RefuelList;