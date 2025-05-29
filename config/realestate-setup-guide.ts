export const REALESTATE_SETUP_GUIDE = `
# 🏠 MELANO INC REAL ESTATE BOT SETUP GUIDE
## Complete Implementation for Real Estate Professionals

## 🚀 QUICK START (15 MINUTES)

### 📋 PREREQUISITES
- Real estate business (brokerage, agent, developer, etc.)
- Website or landing page
- CRM system (recommended: Follow Up Boss, Chime, kvCORE)
- WhatsApp Business account (optional but recommended)

### 🔧 STEP 1: ENVIRONMENT CONFIGURATION

Create `.env.local` file with your credentials:

\`\`\`env
# Real Estate CRM Integration (choose one or more)
FOLLOWUPBOSS_API_KEY=your_followupboss_api_key
CHIME_API_KEY=your_chime_api_key
KVCORE_API_KEY=your_kvcore_api_key
REALGEEKS_API_KEY=your_realgeeks_api_key

# WhatsApp Business API (optional)
WHATSAPP_ACCESS_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token

# Email Integration
SENDGRID_API_KEY=your_sendgrid_key
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your_ga_id
FACEBOOK_PIXEL_ID=your_pixel_id
\`\`\`

### 🔧 STEP 2: CRM SETUP

#### Follow Up Boss (Recommended)
1. Login to Follow Up Boss → Settings → API
2. Generate API key
3. Add to .env as FOLLOWUPBOSS_API_KEY
4. Test connection: \`curl -H "Authorization: Bearer YOUR_KEY" https://api.followupboss.com/v1/people\`

#### Chime CRM
1. Chime → Settings → Integrations → API Access
2. Create new API key
3. Add to .env as CHIME_API_KEY
4. Configure webhook URL: \`https://yourdomain.com/api/realestate-webhook\`

#### kvCORE
1. kvCORE → Admin → API Management
2. Generate API credentials
3. Add to .env as KVCORE_API_KEY
4. Set up lead routing rules

#### Real Geeks
1. Real Geeks → Settings → API
2. Generate API token
3. Add to .env as REALGEEKS_API_KEY
4. Configure lead assignment rules

### 🔧 STEP 3: BOT CUSTOMIZATION

#### Customize ARIA Bot for Your Market
Edit \`prompts/aria-realestate-bot.ts\`:

\`\`\`typescript
// Update with your local market info
const LOCAL_MARKET_INFO = {
  primary_areas: ["Downtown", "Suburbs", "Waterfront", "Historic District"],
  average_prices: {
    "Downtown": "$450,000",
    "Suburbs": "$320,000", 
    "Waterfront": "$750,000",
    "Historic District": "$280,000"
  },
  market_conditions: "Balanced market with moderate inventory",
  average_days_on_market: 25,
  top_schools: ["Lincoln Elementary", "Washington High", "St. Mary's"],
}
\`\`\`

#### Agent Assignment Rules
Configure automatic lead assignment:

\`\`\`typescript
const AGENT_ASSIGNMENT_RULES = [
  {
    condition: "luxury AND budget > $1M",
    agent_id: "agent_001",
    agent_name: "Sarah Johnson",
    specialization: ["Luxury Homes", "Waterfront Properties"]
  },
  {
    condition: "first_time_buyer",
    agent_id: "agent_002", 
    agent_name: "Mike Chen",
    specialization: ["First-Time Buyers", "FHA Loans"]
  },
  {
    condition: "investment",
    agent_id: "agent_003",
    agent_name: "Lisa Rodriguez", 
    specialization: ["Investment Properties", "Multi-Family"]
  }
]
\`\`\`

### 🔧 STEP 4: WEBSITE INTEGRATION

#### Add Chat Widget to Your Website
\`\`\`html
<!-- Add to your website's <head> -->
<script>
  window.MelanoConfig = {
    botId: 'aria-realestate',
    primaryColor: '#2563eb',
    position: 'bottom-right',
    greeting: 'Hi! I\'m ARIA, your AI real estate assistant. How can I help you today?',
    triggers: {
      timeDelay: 30000, // Show after 30 seconds
      scrollPercentage: 50, // Show after 50% scroll
      exitIntent: true // Show on exit intent
    }
  };
</script>
<script src="https://cdn.melano.ai/widget/v1/melano-widget.js"></script>
\`\`\`

#### Landing Page Integration
Add the bot to specific landing pages:

\`\`\`html
<!-- For property listing pages -->
<script>
  window.MelanoConfig.context = {
    page_type: 'property_listing',
    property_id: 'PROP_123',
    property_type: 'Single Family Home',
    price: '$425,000',
    location: 'Downtown District'
  };
</script>

<!-- For neighborhood pages -->
<script>
  window.MelanoConfig.context = {
    page_type: 'neighborhood',
    area: 'Downtown District',
    average_price: '$450,000'
  };
</script>
\`\`\`

### 🔧 STEP 5: LEAD SCORING CONFIGURATION

#### Customize Lead Scoring Rules
Edit \`utils/lead-scoring-realestate.ts\`:

\`\`\`typescript
// Adjust scoring weights for your business
const SCORING_WEIGHTS = {
  timeline_urgency: 35,    // How soon they want to buy/sell
  budget_qualification: 25, // Budget defined and realistic
  contact_completeness: 20, // Full contact information
  engagement_quality: 15,   // Detailed responses
  specific_requirements: 5  // Specific property criteria
}

// Customize timeline scoring
const TIMELINE_SCORES = {
  "immediately": 35,
  "within 30 days": 35,
  "within 3 months": 25,
  "within 6 months": 15,
  "within a year": 8,
  "just looking": 3
}
\`\`\`

### 🔧 STEP 6: AUTOMATED FOLLOW-UP

#### Email Templates
Create automated email sequences in \`templates/email/\`:

**Hot Lead Email (sent immediately):**
\`\`\`html
Subject: Your Property Search - Let's Find Your Dream Home Today!

Hi {{firstName}},

Thank you for your interest in {{propertyType}} properties in {{location}}! 

Based on our conversation, I have several properties that match your criteria:
- Budget: {{budget}}
- Timeline: {{timeline}}
- Preferred areas: {{location}}

I'd love to show you some options today. When would be a good time for a quick call?

Best regards,
{{agentName}}
{{agentPhone}}
\`\`\`

**Warm Lead Email (sent within 4 hours):**
\`\`\`html
Subject: {{location}} Market Update + Properties for You

Hi {{firstName}},

I've put together a personalized market report for {{location}} based on your interests.

Current market highlights:
- Average price: {{averagePrice}}
- Days on market: {{averageDays}}
- Inventory levels: {{inventoryLevel}}

I've also found {{propertyCount}} properties that match your criteria. 

Would you like to schedule a time to review these together?

Best,
{{agentName}}
\`\`\`

#### SMS Templates (if using WhatsApp/SMS)
\`\`\`
Hot Lead SMS:
"Hi {{firstName}}! This is {{agentName}} following up on your property search in {{location}}. I have some great options to show you. When's a good time for a quick call today?"

Warm Lead SMS:
"Hi {{firstName}}! I found some properties in {{location}} that match what you're looking for. Would you like me to send you the details?"
\`\`\`

### 🔧 STEP 7: ANALYTICS AND REPORTING

#### Set Up Conversion Tracking
\`\`\`javascript
// Google Analytics Events
gtag('event', 'lead_qualified', {
  'event_category': 'Real Estate',
  'event_label': lead.category,
  'value': lead.score
});

// Facebook Pixel Events
fbq('track', 'Lead', {
  content_category: 'Real Estate',
  content_name: lead.intent,
  value: lead.score
});
\`\`\`

#### Dashboard Metrics to Track
- **Lead Volume**: Total leads per day/week/month
- **Lead Quality**: Average lead score by source
- **Conversion Rates**: Leads to appointments to closings
- **Response Times**: Bot response vs. agent follow-up
- **ROI**: Cost per lead vs. commission per closing

### 🔧 STEP 8: TESTING AND OPTIMIZATION

#### Test Scenarios
1. **First-time buyer** looking for starter home
2. **Luxury buyer** with $1M+ budget
3. **Real estate investor** seeking rental properties
4. **Seller** wanting market valuation
5. **Renter** looking for temporary housing

#### A/B Testing Ideas
- Different greeting messages
- Various qualification question orders
- Multiple lead magnet offers
- Different urgency creation techniques

### 📊 EXPECTED RESULTS

#### Typical Performance Metrics:
- **Lead Capture Rate**: 15-25% of website visitors
- **Qualification Rate**: 60-80% of captured leads
- **Appointment Booking**: 30-50% of qualified leads
- **Response Time**: Under 30 seconds (24/7)
- **Cost Reduction**: 60% less than traditional lead gen
- **Conversion Increase**: 200-400% improvement

#### ROI Timeline:
- **Week 1**: Bot deployed and capturing leads
- **Month 1**: 50-100 qualified leads generated
- **Month 3**: First closings from bot-generated leads
- **Month 6**: Full ROI typically achieved

### 🚨 TROUBLESHOOTING

#### Common Issues:

**Bot not capturing leads:**
- Check widget installation
- Verify API endpoints
- Test form submissions

**CRM integration failing:**
- Validate API keys
- Check webhook URLs
- Review field mappings

**Low lead quality:**
- Adjust qualification questions
- Refine scoring algorithm
- Update lead routing rules

**Poor conversion rates:**
- Improve follow-up speed
- Enhance email templates
- Train agents on bot leads

### 📞 SUPPORT AND TRAINING

#### Implementation Support:
- **Setup Call**: 1-hour implementation review
- **Training Session**: Agent training on bot leads
- **30-Day Check-in**: Performance review and optimization
- **Ongoing Support**: Email and chat support

#### Best Practices Training:
- How to handle bot-qualified leads
- Follow-up timing and techniques
- CRM optimization for automation
- Performance monitoring and reporting

### 💰 PRICING AND PACKAGES

#### Starter Package - $497/month:
- ARIA bot for up to 500 conversations/month
- 1 CRM integration
- Basic email templates
- Standard support

#### Professional Package - $997/month:
- ARIA bot for up to 2,000 conversations/month
- 3 CRM integrations
- Advanced email/SMS automation
- WhatsApp integration
- Priority support
- Monthly optimization calls

#### Enterprise Package - $1,997/month:
- Unlimited conversations
- All CRM integrations
- Custom bot training
- White-label options
- Dedicated success manager
- Custom reporting dashboard

Ready to transform your real estate business? Let's get started! 🚀
`
