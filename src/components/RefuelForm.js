import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, TextField, Button } from '@mui/material'
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'
import { Delete } from '@mui/icons-material'
import {
    collection,
    deleteDoc,
    addDoc,
    serverTimestamp,
    doc,
    query,
    where,
    orderBy,
    getDocs
} from 'firebase/firestore'
const colRef = collection(db, 'refuels')
function RefuelForm() {
    const { currentUser } = useAuth()
    const [dateText, setDateText] = useState("")
    const [kmText, setKmText] = useState(0)
    const [kmsincerefuelText, setKmsincerefuel] = useState(0)
    const [litersText, setLitersText] = useState(0)
    const [priceText, setPriceText] = useState(0)
    const [items, setItems] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault()
        addDoc(colRef, {
            date: dateText,
            km: Number(kmText),
            kmsincerefuel: Number(kmsincerefuelText),
            liters: Number(litersText),
            price: Number(priceText),
            cost: Math.round(Number(litersText) * Number(priceText)),
            consumption: Math.round(Number(litersText) / Number(kmsincerefuelText) * 1000) / 10,
            uid: currentUser.uid,
            createdAt: serverTimestamp()
        })
        setDateText()
        setKmText(0)
        setLitersText(0)
        setPriceText(0)
        setKmsincerefuel(0)
    }
    
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
    }, [handleSubmit])
    const removeRefuel = async (e, item) => {
        deleteDoc(doc(db, "refuels", item.id));
        let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
        setItems(filteredArray);
    }
    const columns = [
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'km', headerName: 'Odometer', flex: 1 },
        { field: 'kmsincerefuel', headerName: 'Since last refuel', flex: 1 },
        { field: 'liters', headerName: 'Liters', flex: 1 },
        { field: 'price', headerName: 'Price per liter', flex: 1 },
        { field: 'cost', headerName: 'Cost (€)', flex: 1 },
        { field: 'consumption', headerName: 'L/100km', flex: 1 },
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
        <Box sx={{ pt: 10, ml: 2, mr: '25%' }}>
            <form onSubmit={handleSubmit} style={{ width: "100%", marginBottom: '5em' }}>
                <TextField sx={{p:1}} type='date' value={dateText} onChange={event => setDateText(event.target.value)} id="outlined-basic" label="" variant="outlined" />
                <TextField sx={{p:1}} type='number' value={kmText} onChange={event => setKmText(event.target.value)} id="outlined-basic" label="Odometer" variant="outlined" />
                <TextField sx={{p:1}} type='number' value={kmsincerefuelText} onChange={event => setKmsincerefuel(event.target.value)} id="outlined-basic" label="Kilometers since last refuel" variant="outlined" />
                <TextField sx={{p:1}} type='number' value={litersText} onChange={event => setLitersText(event.target.value)} id="outlined-basic" label="Refueled liters" variant="outlined" />
                <TextField sx={{p:1}} type='number' value={priceText} onChange={event => setPriceText(event.target.value)} id="outlined-basic" label="Price per liter" variant="outlined" />
                <Button sx={{marginLeft: 2}} type='submit' variant="contained">Add refuel</Button>
            </form>
            <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={items} columns={columns} sx={{border: 1}} components={{ Toolbar: GridToolbar }}/>
            </div>
        </Box>

    )
}
export default RefuelForm;