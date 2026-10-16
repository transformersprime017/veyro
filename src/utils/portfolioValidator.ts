import { PortfolioProject, Achievement } from '../types';

export interface ValidationIssue {
  severity: 'error' | 'warning';
  entity: 'project' | 'achievement';
  id: string;
  field: string;
  message: string;
}

export interface ValidationReport {
  isValid: boolean;
  projectCount: number;
  achievementCount: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const VALID_PROJECT_STATUSES = ['concept', 'in_progress', 'live', 'archived'];
const VALID_PROJECT_TYPES = ['website', 'client', 'concept', 'experiment', 'system'];

/**
 * Validates the portfolio and achievements database for integrity,
 * unique slugs, valid URLs, and mandatory concept disclosures.
 */
export function validatePortfolioData(
  projects: PortfolioProject[],
  achievements: Achievement[]
): ValidationReport {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const seenProjectIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenAchievementIds = new Set<string>();

  // 1. Validate Projects
  projects.forEach((p) => {
    // Check ID
    if (!p.id || typeof p.id !== 'string') {
      errors.push({ severity: 'error', entity: 'project', id: 'unknown', field: 'id', message: 'Project missing required id' });
    } else if (seenProjectIds.has(p.id)) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'id', message: `Duplicate project id: "${p.id}"` });
    } else {
      seenProjectIds.add(p.id);
    }

    // Check Slug
    if (!p.slug || typeof p.slug !== 'string' || !/^[a-z0-9-]+$/.test(p.slug)) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'slug', message: `Invalid or missing slug: "${p.slug}"` });
    } else if (seenSlugs.has(p.slug)) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'slug', message: `Duplicate project slug: "${p.slug}"` });
    } else {
      seenSlugs.add(p.slug);
    }

    // Check Title & Subtitle
    if (!p.title || p.title.trim().length === 0) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'title', message: 'Project title is required' });
    }
    if (!p.subtitle || p.subtitle.trim().length === 0) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'subtitle', message: 'Project subtitle is required' });
    }

    // Check Status & Type
    if (!VALID_PROJECT_STATUSES.includes(p.status)) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'status', message: `Invalid status: "${p.status}"` });
    }
    if (!VALID_PROJECT_TYPES.includes(p.projectType)) {
      errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'projectType', message: `Invalid projectType: "${p.projectType}"` });
    }

    // Concept disclosure check
    if ((p.status === 'concept' || p.projectType === 'concept') && !p.conceptDisclosure) {
      warnings.push({
        severity: 'warning',
        entity: 'project',
        id: p.id,
        field: 'conceptDisclosure',
        message: 'Concept project should have an explicit conceptDisclosure statement for transparency',
      });
    }

    // Check liveUrl if supplied
    if (p.liveUrl) {
      try {
        const parsed = new URL(p.liveUrl);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'liveUrl', message: `Malformed liveUrl protocol: "${p.liveUrl}"` });
        }
      } catch {
        errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'liveUrl', message: `Invalid liveUrl format: "${p.liveUrl}"` });
      }
    }

    // Check repoUrl if supplied
    if (p.repoUrl) {
      try {
        const parsed = new URL(p.repoUrl);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'repoUrl', message: `Malformed repoUrl protocol: "${p.repoUrl}"` });
        }
      } catch {
        errors.push({ severity: 'error', entity: 'project', id: p.id, field: 'repoUrl', message: `Invalid repoUrl format: "${p.repoUrl}"` });
      }
    }
  });

  // 2. Validate Achievements
  achievements.forEach((a) => {
    if (!a.id || typeof a.id !== 'string') {
      errors.push({ severity: 'error', entity: 'achievement', id: 'unknown', field: 'id', message: 'Achievement missing required id' });
    } else if (seenAchievementIds.has(a.id)) {
      errors.push({ severity: 'error', entity: 'achievement', id: a.id, field: 'id', message: `Duplicate achievement id: "${a.id}"` });
    } else {
      seenAchievementIds.add(a.id);
    }

    if (!a.title || a.title.trim().length === 0) {
      errors.push({ severity: 'error', entity: 'achievement', id: a.id, field: 'title', message: 'Achievement title is required' });
    }

    if (!a.description || a.description.trim().length === 0) {
      errors.push({ severity: 'error', entity: 'achievement', id: a.id, field: 'description', message: 'Achievement description is required' });
    }

    if (a.referenceUrl) {
      try {
        const parsed = new URL(a.referenceUrl);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.push({ severity: 'error', entity: 'achievement', id: a.id, field: 'referenceUrl', message: `Malformed referenceUrl: "${a.referenceUrl}"` });
        }
      } catch {
        errors.push({ severity: 'error', entity: 'achievement', id: a.id, field: 'referenceUrl', message: `Invalid referenceUrl format: "${a.referenceUrl}"` });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    projectCount: projects.length,
    achievementCount: achievements.length,
    errors,
    warnings,
  };
}
