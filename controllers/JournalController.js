import Journal from '../models/Journal.js';


// Tambah Jurnal Baru
export const addJournal = async (req, res) => {
    try {
        const { employeeID, date, description, evaluation } = req.body;

        if (!employeeID || !date || !description || !evaluation) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const journal = await Journal.create({
            employeeID,
            date,
            description,
            evaluation
        });

        res.status(201).json(journal);
    } catch (error) {
        console.error('Error adding journal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Tampilkan Semua Jurnal Berdasarkan employeeID
// controllers/journalController.js

export const getJournalsByEmployeeID = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const journals = await Journal.findAll({ where: { employeeID } });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Tampilkan Jurnal Berdasarkan journalID
export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJournal = async (req, res) => {
  try {
      const { journalID } = req.params;
      const { date, description, evaluation } = req.body;

      const journal = await Journal.findByPk(journalID);

      if (!journal) {
          return res.status(404).json({ message: 'Journal not found' });
      }

      journal.date = date;
      journal.description = description;
      journal.evaluation = evaluation;

      await journal.save();
      res.json(journal);
  } catch (error) {
      console.error('Error updating journal:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


// Hapus Jurnal
export const deleteJournal = async (req, res) => {
  const { journalID } = req.params;
  try {
    const journal = await Journal.findByPk(journalID);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    
    await journal.destroy();
    res.status(200).json({ message: 'Journal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
