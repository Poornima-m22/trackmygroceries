import express from 'express';
import pantryRoutes from './pantry';
import historyRoutes from './history';
import uploadRoutes from './upload';
import multer from 'multer';
import PantryItem from '../models/PantryItem';
import HistoryRecord from '../models/HistoryRecord';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use('/pantry', pantryRoutes);
router.use('/history', historyRoutes);
router.use('/upload', uploadRoutes);

// Simulated parse endpoint: accepts raw text or image (buffer)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // For prototyping: if rawText provided, use that; otherwise return a mocked parse
    const rawText = req.body.rawText;
    let parsedItems;
    if (rawText) {
      // Use a simple split heuristic for prototyping
      // Expect lines like "Rice 2 kg 120.00"
      parsedItems = rawText
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
        .map(line => {
          const parts = line.split(/\s+/);
          // naive: last part = price, second last = qty
          const price = parseFloat(parts[parts.length - 1]) || 0;
          const qty = parseFloat(parts[parts.length - 2]) || 1;
          const name = parts.slice(0, parts.length - 2).join(' ');
          return { name, quantity: qty, price };
        });
    } else {
      // mocked parse from image
      parsedItems = [
        { name: 'Rice', quantity: 2, unit: 'kg', price: 120 },
        { name: 'Milk', quantity: 1, unit: 'ltr', price: 40 }
      ];
    }

    res.json({ parsedItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Parse failed' });
  }
});

// Save bill & update pantry + history (simple implementation)
router.post('/save', async (req, res) => {
  try {
    const { parsedItems, billId, date } = req.body;
    if (!parsedItems || !Array.isArray(parsedItems)) {
      return res.status(400).json({ error: 'parsedItems required' });
    }

    const savedHistory = [];
    for (const it of parsedItems) {
      const rec = new HistoryRecord({
        billId: billId || undefined,
        itemName: it.name,
        quantity: it.quantity || 0,
        price: it.price || 0,
        unit: it.unit || undefined,
        date: date ? new Date(date) : new Date()
      });
      await rec.save();
      savedHistory.push(rec);

      // update pantry: add quantity
      const existing = await PantryItem.findOne({ name: it.name });
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (it.quantity || 0);
        existing.lastUpdated = new Date();
        await existing.save();
      } else {
        const p = new PantryItem({ name: it.name, quantity: it.quantity || 0, unit: it.unit });
        await p.save();
      }
    }

    res.json({ success: true, savedHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Save failed' });
  }
});

export default router;