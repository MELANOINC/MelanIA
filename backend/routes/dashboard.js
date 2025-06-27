const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../services/dashboardService');

// Route to fetch real-time data for the dashboard
router.get('/api/dashboard', async (req, res) => {
    try {
        // Query the database for lead, flow, activation, and conversion data
        const data = await getDashboardData();

        // Calculate the KPI "$ por lead generado"
        const kpi = data.totalRevenue / data.leads;

        // Send the data to the frontend for display
        res.status(200).json({
            leads: data.leads,
            flowEntries: data.flowEntries,
            botActivations: data.botActivations,
            conversions: data.conversions,
            kpi: kpi.toFixed(2),
            dates: data.dates,
            leadsOverTime: data.leadsOverTime,
            flowEntriesOverTime: data.flowEntriesOverTime,
            botActivationsOverTime: data.botActivationsOverTime,
            conversionsOverTime: data.conversionsOverTime
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

module.exports = router;
