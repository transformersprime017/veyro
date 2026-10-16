import { LeadFormData, LeadSubmissionResult } from '../types';
import { studioConfig, getWhatsAppLink } from '../config/studio';

/**
 * VEYRO Lead Submission & Integration Service
 * 
 * Separates form presentation from network transmission and external dispatch.
 * 
 * ARCHITECTURE PRINCIPLES:
 * 1. Zero Fake Success: Never display a confirmation or claim an enquiry was sent
 *    unless a verified remote endpoint actually responded with HTTP 200 OK.
 * 2. Honest Fallback: If no endpoint is configured, return status: 'unconfigured'
 *    and offer verified direct actions (copying formatted brief, or verified direct email).
 * 3. Privacy Respect: Never silently store sensitive client emails, phones, or scopes
 *    in browser localStorage.
 * 4. Spam Mitigation: Inspects honeypot trap field (data.websiteUrl). If filled, rejects immediately.
 * 5. Robust Network Handling: 10-second timeout via AbortController with descriptive errors.
 */

const REQUEST_TIMEOUT_MS = 10000;

/**
 * Validates form input fields client-side before dispatch.
 */
export function validateLeadForm(data: LeadFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // 1. Full Name
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // 2. Email Address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business or personal email address.';
  }

  // 3. Business Type
  if (!data.businessType || data.businessType.trim() === '') {
    errors.businessType = 'Please select your business or practice type.';
  }

  // 4. Service Needed
  if (!data.serviceNeeded || data.serviceNeeded.trim() === '') {
    errors.serviceNeeded = 'Please select the primary service required for your project.';
  }

  // 5. Project Details (minimum 15 characters)
  if (!data.projectDetails || data.projectDetails.trim().length < 15) {
    errors.projectDetails = 'Please provide a brief summary of your project requirements (at least 15 characters).';
  }

  // 6. Consent
  if (!data.consentGiven) {
    errors.consentGiven = 'Consent is required to allow us to review and respond to your enquiry.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats lead data into an architectural, clean plaintext summary.
 * Used for clipboard copying or verified direct email draft creation.
 */
export function formatLeadBrief(data: LeadFormData): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `================================================
VEYRO PROJECT ENQUIRY & COMMISSION BRIEF
Date: ${dateStr}
================================================

CLIENT DETAILS
• Name: ${data.fullName.trim()}
• Business: ${data.businessName?.trim() || 'Not specified'}
• Email: ${data.email.trim()}
• Phone / WhatsApp: ${data.phoneOrWhatsapp?.trim() || 'Not provided'}

PROJECT SCOPE
• Business Type: ${data.businessType}
• Service Needed: ${data.serviceNeeded}
• Budget Tier: ${data.budgetRange || 'To be determined'}

PROJECT OBJECTIVES & REQUIREMENTS
${data.projectDetails.trim()}

------------------------------------------------
Generated via VEYRO Web & Digital Studio (/contact)
Built to be noticed. Designed to convert.
================================================`;
}

/**
 * Generates an active mailto link with encoded subject and prefilled brief.
 */
export function generateMailtoUrl(data: LeadFormData): string {
  const email = studioConfig.contact.email || 'hello.veyro@gmail.com';
  const subject = encodeURIComponent(`Project Enquiry: ${data.businessName?.trim() || data.fullName.trim()} // VEYRO`);
  const body = encodeURIComponent(formatLeadBrief(data));
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Generates a WhatsApp direct message URL if studio WhatsApp number is validly configured.
 */
export function generateWhatsAppUrl(data: LeadFormData): string | null {
  const message = `Hello VEYRO Studio, I am submitting a project enquiry for ${data.businessName || data.fullName}. Service: ${data.serviceNeeded}. Brief summary: ${data.projectDetails.slice(0, 120)}...`;
  return getWhatsAppLink(message);
}

/**
 * Returns whether a real HTTPS submission endpoint is currently configured.
 */
export function isSubmissionEndpointConfigured(): boolean {
  return getActiveSubmissionEndpoint() !== null;
}

/**
 * Returns the active configured HTTPS submission endpoint, or null if unconfigured.
 */
export function getActiveSubmissionEndpoint(): string | null {
  const configured =
    studioConfig.integrations.formEndpoint ||
    studioConfig.integrations.googleSheetsWebhook ||
    studioConfig.integrations.crmEndpoint;

  if (!configured || typeof configured !== 'string') return null;

  const trimmed = configured.trim();
  // Ensure it is a valid HTTPS endpoint and not an empty or example string
  if (trimmed.startsWith('https://') && !trimmed.includes('example.com')) {
    return trimmed;
  }

  return null;
}

/**
 * Submits a validated lead inquiry to the configured HTTPS endpoint.
 */
export async function submitLeadEnquiry(data: LeadFormData): Promise<LeadSubmissionResult> {
  const timestamp = new Date().toISOString();

  // 1. Honeypot check (hidden bot trap)
  if (data.websiteUrl && data.websiteUrl.trim().length > 0) {
    // Bot detected: silently return a benign response without hitting endpoints
    return {
      success: false,
      status: 'error',
      message: 'Automated submission rejected.',
      timestamp,
    };
  }

  // 2. Validate inputs
  const validation = validateLeadForm(data);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return {
      success: false,
      status: 'error',
      message: firstError || 'Please correct the highlighted fields.',
      timestamp,
    };
  }

  // 3. Inspect active endpoint
  const endpoint = getActiveSubmissionEndpoint();
  if (!endpoint) {
    // HONEST FALLBACK: Do NOT fake a submission!
    return {
      success: false,
      status: 'unconfigured',
      message:
        'No remote submission endpoint (VITE_FORM_ENDPOINT or VITE_GOOGLE_SHEETS_WEBHOOK) is configured for this deployment. Your enquiry has not been transmitted over the internet.',
      timestamp,
      requiresAlternativeAction: true,
    };
  }

  // 4. Construct payload
  const payload = {
    submissionId: `VEYRO-${Date.now().toString(36).toUpperCase()}`,
    timestamp,
    fullName: data.fullName.trim(),
    businessName: data.businessName?.trim() || 'N/A',
    email: data.email.trim(),
    phoneOrWhatsapp: data.phoneOrWhatsapp?.trim() || 'N/A',
    businessType: data.businessType,
    serviceNeeded: data.serviceNeeded,
    budgetRange: data.budgetRange || 'Unspecified',
    projectDetails: data.projectDetails.trim(),
    consentGiven: data.consentGiven,
    environment: import.meta.env.MODE || 'production',
    source: 'VEYRO Studio /contact',
  };

  // 5. Execute HTTP Request with AbortController timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        status: 'error',
        message: `Endpoint returned HTTP status ${response.status} (${response.statusText || 'Server Error'}). Please use our direct contact options.`,
        timestamp,
      };
    }

    // Try parsing response if json
    let responseData: Record<string, unknown> = {};
    try {
      responseData = await response.json();
    } catch {
      // Non-JSON response but HTTP 200 is still considered received
    }

    const assignedId = (responseData.id as string) || (responseData.submissionId as string) || payload.submissionId;

    return {
      success: true,
      status: 'success',
      message: 'Enquiry received successfully. Our lead technical engineer will review your project parameters within 24 hours.',
      submissionId: assignedId,
      timestamp,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        status: 'error',
        message: 'Submission request timed out after 10 seconds. The server did not respond.',
        timestamp,
      };
    }

    return {
      success: false,
      status: 'error',
      message:
        'Network error: Failed to reach the submission server. This may be caused by a CORS restriction or network outage.',
      timestamp,
    };
  }
}
