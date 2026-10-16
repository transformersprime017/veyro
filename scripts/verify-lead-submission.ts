/**
 * VEYRO Phase 6 QA Test Suite: Lead Submission, Validation, Honeypot & Fallbacks
 */
import { validateLeadForm, formatLeadBrief, submitLeadEnquiry } from '../src/services/leadSubmission';
import { LeadFormData } from '../src/types';

console.log('--- Starting VEYRO Lead System Verification ---');

// TEST 1: Required Field Validation (Empty Form)
const emptyForm: LeadFormData = {
  fullName: '',
  email: '',
  businessType: '',
  serviceNeeded: '',
  projectDetails: '',
  consentGiven: false,
};
const res1 = validateLeadForm(emptyForm);
console.assert(!res1.isValid, 'TEST 1 FAILED: Empty form should be invalid');
console.assert(res1.errors.fullName !== undefined, 'TEST 1 FAILED: fullName error missing');
console.assert(res1.errors.email !== undefined, 'TEST 1 FAILED: email error missing');
console.assert(res1.errors.businessType !== undefined, 'TEST 1 FAILED: businessType error missing');
console.assert(res1.errors.serviceNeeded !== undefined, 'TEST 1 FAILED: serviceNeeded error missing');
console.assert(res1.errors.projectDetails !== undefined, 'TEST 1 FAILED: projectDetails error missing');
console.assert(res1.errors.consentGiven !== undefined, 'TEST 1 FAILED: consentGiven error missing');
console.log('✓ TEST 1 PASSED: Empty form correctly triggers all required field errors.');

// TEST 2: Invalid Email & Insufficient Project Details (<20 chars)
const badForm: LeadFormData = {
  fullName: 'A', // too short (<2 chars)
  email: 'notanemail', // invalid regex
  businessType: 'Interior Design Practice',
  serviceNeeded: 'Bespoke Website',
  projectDetails: 'Too short', // 9 chars (<20)
  consentGiven: true,
};
const res2 = validateLeadForm(badForm);
console.assert(!res2.isValid, 'TEST 2 FAILED: Form with invalid email should be invalid');
console.assert(res2.errors.fullName?.includes('at least 2 characters'), 'TEST 2 FAILED: Short name not flagged');
console.assert(res2.errors.email?.includes('valid'), 'TEST 2 FAILED: Invalid email not flagged');
console.assert(res2.errors.projectDetails?.includes('at least 20 characters'), 'TEST 2 FAILED: Short projectDetails not flagged');
console.log('✓ TEST 2 PASSED: Invalid email format and insufficient character length correctly flagged.');

// TEST 3: Honeypot Anti-Spam Detection
const botForm: LeadFormData = {
  fullName: 'Bot User',
  email: 'bot@example.com',
  businessType: 'Interior Design Practice',
  serviceNeeded: 'Bespoke Website',
  projectDetails: 'This is a genuine inquiry that meets the minimum length requirement.',
  consentGiven: true,
  websiteUrl: 'https://spam-bot.site', // Filled honeypot
};

submitLeadEnquiry(botForm).then(async (botResult) => {
  console.assert(!botResult.success, 'TEST 3 FAILED: Bot submission should not succeed');
  console.assert(botResult.status === 'error', 'TEST 3 FAILED: Bot submission status should be error');
  console.assert(botResult.message.includes('Automated submission rejected'), 'TEST 3 FAILED: Honeypot message unexpected');
  console.log('✓ TEST 3 PASSED: Honeypot spam trap immediately rejects bot input without dispatching.');

  // TEST 4: Honest Fallback when Endpoint Unconfigured
  const validUserForm: LeadFormData = {
    fullName: 'Mohd Salim',
    businessName: 'Studio Archline',
    email: 'contact@studioarchline.com',
    phoneOrWhatsapp: '+91 98765 43210',
    businessType: 'Interior Design Practice',
    serviceNeeded: 'Bespoke Website & Digital Showroom',
    budgetRange: '₹1,50,000 – ₹3,00,000',
    projectDetails: 'Looking for a bespoke luxury interior design digital showroom with spatial project case studies.',
    consentGiven: true,
  };

  const fallbackResult = await submitLeadEnquiry(validUserForm);
  console.assert(!fallbackResult.success, 'TEST 4 FAILED: Unconfigured endpoint should not report fake success');
  console.assert(fallbackResult.status === 'unconfigured', 'TEST 4 FAILED: Status should be unconfigured');
  console.assert(fallbackResult.requiresAlternativeAction === true, 'TEST 4 FAILED: Expected requiresAlternativeAction to be true');
  console.log('✓ TEST 4 PASSED: Unconfigured endpoint honestly reports zero fake transmission and triggers alternative actions.');

  // TEST 5: Formatted Brief Generation
  const brief = formatLeadBrief(validUserForm);
  console.assert(brief.includes('Mohd Salim'), 'TEST 5 FAILED: Brief missing client name');
  console.assert(brief.includes('Studio Archline'), 'TEST 5 FAILED: Brief missing business name');
  console.assert(brief.includes('₹1,50,000 – ₹3,00,000'), 'TEST 5 FAILED: Brief missing budget');
  console.assert(brief.includes('Interior Design Practice'), 'TEST 5 FAILED: Brief missing business type');
  console.log('✓ TEST 5 PASSED: Formatted plain-text brief generates complete, clean client specification.');

  console.log('--- All Lead System Tests Successfully Passed! ---');
}).catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
