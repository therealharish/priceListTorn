import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../styles/Prices.css';

const Prices = ({loading, setLoading, prices, setPrices}) => {

    const formatNumberIntoPrice = (number) => {
        const roundedPrice = Math.round(number);
        return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const groupByCategory = () => {
        const categoryOrder = [
            'Flower',
            'Plushie',
            'Drug',
            'Booster',
            'Energy Drink',
            'Supply Pack',
            'Special',
            'Alcohol',
            'Candy',
            'Medical',
            'Temporary',
            'Enhancer'
        ];
    
        const categories = {};
        const remainingCategories = [];
    
        // Initialize categories object with empty arrays
        categoryOrder.forEach(category => {
            categories[category] = [];
        });
    
        // Sort the prices into appropriate categories
        prices.forEach(price => {
            let category = price.Categorie;

            if (price.Item === "Exotic Flower Set") {
                category = "Flower";
            } else if (price.Item === "Plushie Set") {
                category = "Plushie";
            }

            if (categories[category]) {
                categories[category].push(price);
            } else {
                // If category not in the predefined list, push it to remainingCategories
                remainingCategories.push(price);
            }
        });
    
        // Add remaining categories to the categories object in the order they appear
        remainingCategories.forEach(price => {
            const category = price.Categorie;
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(price);
        });

        for (const category in categories) {
            categories[category].sort((a, b) => a.Actual - b.Actual);
        }
    
        return categories;
    };

    return (
        <div className="prices-container">
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                Object.entries(groupByCategory()).map(([category, categoryPrices]) => (
                    <div key={category} className="category-container">
                        <h3>{category}</h3>
                        <TableContainer component={Paper} style={{ maxHeight: '100%', overflowY: 'auto' }} sx={{ border: '1px solid #ddd' }}>
                            <Table stickyHeader sx={{ width: "35vw" }}>
                                <TableHead>
                                    <TableRow sx = {{backgroundColor: "black", color: "white"}}>
                                        <TableCell colSpan = {2} sx={{ width: '60%', borderRight: '1px solid #ddd', backgroundColor: "black", color: "white", fontWeight: 'bold' }}>&nbsp; Description</TableCell>
                                        <TableCell sx={{ width: '20%', borderRight: '1px solid #ddd', backgroundColor: "black", color: "white", fontWeight: 'bold' }}>Price</TableCell>
                                        <TableCell sx={{ width: '20%', borderRight: '1px solid #ddd', backgroundColor: "black", color: "white", fontWeight: 'bold' }}>Bulk Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categoryPrices.map((price, index) => (
                                        <TableRow key={index}
                                        sx={{ 
                                            borderBottom: '1px solid #ddd', // Add bottom border to each row
                                            borderRight: '1px solid #ddd', // Add right border to each cell
                                        }}>
                                            <TableCell sx={{ width: "5%", borderRight: "1px solid #ddd" }}>
                                                <img
                                                    src={
                                                        (price.Item === "Exotic Flower Set") 
                                                        ? "https://arsonwarehouse.com/images/flower_set.png" 
                                                        : (price.Item === "Plushie Set")
                                                        ? "https://arsonwarehouse.com/images/plushie_set.png"
                                                        : `https://www.torn.com/images/items/${price.ID}/medium.png`
                                                    }
                                                    alt={price.Item}
                                                    style={{ height: '30px' }}
                                                />
                                            </TableCell>
                                            <TableCell sx = {{width: '35%', borderRight: "1px solid #ddd"}}>
                                                    <span style = {{width: '40%'}}>{price.Item}</span>
                                            </TableCell>
                                            <TableCell style = {{borderRight: "1px solid #ddd", textAlign: "right"}}>{`$${formatNumberIntoPrice(price.Actual)}`}</TableCell>
                                            {price['BULK Number']? <TableCell style = {{borderRight: "1px solid #ddd"}}>{`$${formatNumberIntoPrice(price['Bulk Price'])} (${price['BULK Number']}+)`}</TableCell> : <TableCell style = {{borderRight: "1px solid #ddd"}}></TableCell>}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </div>
    );
};

export default Prices;
