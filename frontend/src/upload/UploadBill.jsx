import React, { useState } from 'react'
import axios from 'axios'

export default function UploadBill(){
  const [rawText, setRawText] = useState('')
  const [parsed, setParsed] = useState([])
  const [saving, setSaving] = useState(false)

  const handleParse = async () => {
    const form = new FormData();
    form.append('rawText', rawText);
    const res = await axios.post('/api/upload', form);
    setParsed(res.data.parsedItems || []);
  }

  const handleSave = async () => {
    setSaving(true)
    await axios.post('/api/upload/save', { parsedItems: parsed })
    setSaving(false)
    alert('Saved to Pantry & History')
    setParsed([])
    setRawText('')
  }

  return (
    <div>
      <p>Paste OCR text (or type mock lines like: <em>Rice 2 120</em>)</p>
      <textarea value={rawText} onChange={e=>setRawText(e.target.value)} rows={6} cols={60} />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleParse}>Parse</button>
        <button onClick={handleSave} disabled={!parsed.length || saving}>Save</button>
      </div>

      <h3>Parsed</h3>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
        <tbody>
          {parsed.map((p,i)=> (
            <tr key={i}><td>{p.name}</td><td>{p.quantity}</td><td>{p.price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}