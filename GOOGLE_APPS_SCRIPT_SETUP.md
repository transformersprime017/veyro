# VEYRO Google Apps Script Integration Guide

This guide documents how to deploy a Google Apps Script Web App that receives project enquiries from the VEYRO `/contact` form and logs them into a Google Sheet.

> **CRITICAL NOTE**: Do not claim this integration is connected in production until you have completed the deployment steps below, placed the resulting Web App URL into your environment variable (`VITE_FORM_ENDPOINT` or `VITE_GOOGLE_SHEETS_WEBHOOK`), and tested an end-to-end submission.

---

## 1. Google Sheets Setup

1. Create a new Google Sheet named **VEYRO Studio — Leads & Enquiries**.
2. Set row 1 headers in the active sheet:
   - `A1`: `Timestamp`
   - `B1`: `Submission ID`
   - `C1`: `Full Name`
   - `D1`: `Business Name`
   - `E1`: `Email`
   - `F1`: `Phone / WhatsApp`
   - `G1`: `Business Type`
   - `H1`: `Service Needed`
   - `I1`: `Budget Range`
   - `J1`: `Project Details`
   - `K1`: `Consent Given`
   - `L1`: `Status`

---

## 2. Google Apps Script Code

In your Google Sheet, navigate to **Extensions → Apps Script**. Replace all code in `Code.gs` with the following:

```javascript
/**
 * VEYRO Web & Digital Studio — Inbound Lead Webhook Handler
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var row = [
      data.timestamp || new Date().toISOString(),
      data.submissionId || 'VEYRO-' + new Date().getTime(),
      data.fullName || '',
      data.businessName || '',
      data.email || '',
      data.phoneOrWhatsapp || '',
      data.businessType || '',
      data.serviceNeeded || '',
      data.budgetRange || '',
      data.projectDetails || '',
      data.consentGiven ? 'YES' : 'NO',
      'NEW'
    ];

    sheet.appendRow(row);

    // Return JSON response with CORS compatibility
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        id: data.submissionId,
        message: 'Enquiry received and recorded.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
```

---

## 3. Web App Deployment Settings

To allow the frontend to POST to this endpoint without Google authentication barriers:

1. Click **Deploy → New deployment**.
2. Select type: **Web app**.
3. Configure the following required settings:
   - **Description**: `VEYRO Lead Capture Webhook v1`
   - **Execute as**: `Me (your-google-account@domain.com)`
   - **Who has access**: `Anyone` *(Crucial: if set to "Only myself" or "Domain", external browser submissions will fail with HTTP 401/403)*.
4. Click **Deploy**.
5. Copy the generated **Web app URL** (format: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 4. Expected Payload Schema

The VEYRO `/contact` form sends a JSON POST request with the following schema:

```json
{
  "submissionId": "VEYRO-ABC123XYZ",
  "timestamp": "2026-10-14T10:00:00.000Z",
  "fullName": "Jane Doe",
  "businessName": "Atelier Nova",
  "email": "jane@ateliernova.in",
  "phoneOrWhatsapp": "+91 98765 43210",
  "businessType": "Interior Design Practice",
  "serviceNeeded": "Bespoke Website & Digital Showroom",
  "budgetRange": "₹1,50,000 – ₹3,00,000",
  "projectDetails": "We are a high-end interior architecture practice in South Delhi needing a spatial digital showroom to convert residential clients.",
  "consentGiven": true,
  "environment": "production",
  "source": "VEYRO Studio /contact"
}
```

---

## 5. CORS and Redirect Considerations

- Google Apps Script web apps respond to POST requests by redirecting (`HTTP 302`) to an execution output URL (`script.googleusercontent.com`).
- The modern browser `fetch()` API automatically follows redirects (`redirect: 'follow'`), but some strict browsers or cross-origin headers may trigger a preflight failure if customized headers are added.
- If you encounter a CORS preflight block, ensure the `fetch` in your deployment uses `mode: 'cors'` and standard `Content-Type: application/json` or `text/plain`.

---

## 6. Configuring in VEYRO

Add the deployed URL to your `.env` or `.env.local` file:

```env
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
# OR
VITE_GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the dev server after updating environment variables.
