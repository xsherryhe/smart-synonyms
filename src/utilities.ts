import sanitizeHtml from 'sanitize-html';

function stripSlash(string: string) {
  return string.replace(/\//g, '');
}

function spacesToUnderscores(string: string) {
  return string.replace(/ /g, '_');
}

function underscoresToSpaces(string: string) {
  return string.replace(/_/g, ' ');
}

export function sanitizeInput(string: string) {
  return sanitizeHtml(spacesToUnderscores(stripSlash(string)), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function displayInput(string: string) {
  return underscoresToSpaces(string);
}
