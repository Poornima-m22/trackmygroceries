import { Request, Response } from 'express';
import PantryItem from '../models/PantryItem';
import HistoryRecord from '../models/HistoryRecord';

export const getPantryItems = async (req: Request, res: Response) => {
    try {
        const items = await PantryItem.find({ userId: req.user.id });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pantry items', error });
    }
};

export const addPantryItem = async (req: Request, res: Response) => {
    const { name, unit, quantity, priceAvgPerUnit } = req.body;
    const newItem = new PantryItem({
        userId: req.user.id,
        name,
        unit,
        quantity,
        priceAvgPerUnit,
        lastUpdated: new Date(),
    });

    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding pantry item', error });
    }
};

export const getHistoryRecords = async (req: Request, res: Response) => {
    try {
        const records = await HistoryRecord.find({ userId: req.user.id });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history records', error });
    }
};

export const addHistoryRecord = async (req: Request, res: Response) => {
    const { billId, itemName, quantity, price, unit, date } = req.body;
    const newRecord = new HistoryRecord({
        userId: req.user.id,
        billId,
        itemName,
        quantity,
        price,
        unit,
        date,
    });

    try {
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error adding history record', error });
    }
};