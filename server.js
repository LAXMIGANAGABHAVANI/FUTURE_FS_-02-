const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// LOCAL DATABASE (Array of Lead Objects)
let leadsDatabase = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", source: "Website", status: "new", notes: ["Interested in product demo."] },
  { id: 2, name: "Bob Smith", email: "bob@example.com", source: "LinkedIn", status: "contacted", notes: ["Sent pricing catalog."] }
];

// 1. GET ALL LEADS (Read)
app.get('/api/leads', (req, res) => {
  res.json(leadsDatabase);
});

// 2. POST NEW LEAD (Create)
app.post('/api/leads', (req, res) => {
  const { name, email, source } = req.body;
  const newLead = {
    id: leadsDatabase.length + 1,
    name,
    email,
    source,
    status: 'new',
    notes: []
  };
  leadsDatabase.push(newLead);
  res.status(201).json(newLead);
});

// 3. PUT UPDATE STATUS (Update)
app.put('/api/leads/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let lead = leadsDatabase.find(l => l.id === parseInt(id));
  if (lead) {
    lead.status = status;
    res.json(lead);
  } else {
    res.status(404).json({ message: "Lead not found" });
  }
});

// 4. POST ADD NOTE
app.post('/api/leads/:id/notes', (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  let lead = leadsDatabase.find(l => l.id === parseInt(id));
  if (lead) {
    lead.notes.push(note);
    res.json(lead);
  } else {
    res.status(404).json({ message: "Lead not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));