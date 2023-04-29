import sanitizeHtml from 'sanitize-html';

function stripSlash(string: String) {
  return string.replace(/\//g, '');
}

function spacesToUnderscores(string: String) {
  return string.replace(/ /g, '_');
}

function underscoresToSpaces(string: String) {
  return string.replace(/_/g, ' ');
}

export function sanitizeInput(string: String) {
  return sanitizeHtml(spacesToUnderscores(stripSlash(string)), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export function displayInput(string: String) {
  return underscoresToSpaces(string);
}
