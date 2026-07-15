export const validateApplication = (formData) => {
  const errors = {};

  // Company Name
  if (!formData.company.trim()) {
    errors.company = "Company name is required.";
  }

  // Job Title
  if (!formData.jobTitle.trim()) {
    errors.jobTitle = "Job title is required.";
  }

  // Status
  if (!formData.status) {
    errors.status = "Please select a status.";
  }

  // Applied Date
  if (!formData.appliedDate) {
    errors.appliedDate = "Applied date is required.";
  }

  // Optional Job Link validation
  if (formData.jobLink) {
    try {
      new URL(formData.jobLink);
    } catch {
      errors.jobLink = "Please enter a valid URL.";
    }
  }

  return errors;
};