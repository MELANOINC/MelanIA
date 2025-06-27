const express = require('express'); // Import necessary services for lead management    
const router = express.Router();
const { saveLead, triggerMelaniaFlow, sendWhatsAppMessage } = require('../services/leadService');

// Route to handle lead form submissions
router.post('/submit',  async function (req, res) {
          try {
            const { name, whatsapp, interest, email, department } = req.body;

            // Save lead data to the database   
            await saveLead({ name, whatsapp, interest, email, department });

            // Trigger the Melania conversational flow upon form submission
            await triggerMelaniaFlow({ name, whatsapp, interest, email, department });

            // Send a confirmation message to the lead via WhatsApp
            await sendWhatsAppMessage(whatsapp, 'Gracias por contactarnos. Melania te asistirá en breve.');

            res.status(200).json({ message: 'Lead submitted successfully' });
        } catch (error) {
            console.error('Error submitting lead:', error);
            res.status(500).json({ message: 'Error submitting lead' });
        }
    });

module.exports = router;
