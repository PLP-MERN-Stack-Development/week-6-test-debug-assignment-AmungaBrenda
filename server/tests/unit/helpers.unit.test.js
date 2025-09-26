// Helper functions (create these if they don't exist)
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

describe('Helper Utilities - Unit Tests', () => {
  describe('generateSlug', () => {
    it('should convert title to slug', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Test Post 123')).toBe('test-post-123');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Special @#$ Characters!')).toBe('special-characters');
    });

    it('should handle multiple spaces', () => {
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('should return empty string for empty input', () => {
      expect(generateSlug('')).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeInput('Normal text')).toBe('Normal text');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  text  ')).toBe('text');
    });
  });
});