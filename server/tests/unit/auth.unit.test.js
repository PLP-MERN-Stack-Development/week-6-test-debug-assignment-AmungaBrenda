const jwt = require('jsonwebtoken');

// Mock functions (adjust paths to match your project)
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1d' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
};

describe('Auth Utilities - Unit Tests', () => {
  const mockUser = { 
    _id: '507f1f77bcf86cd799439011', 
    email: 'test@example.com' 
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockUser);
      
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should include user data in token payload', () => {
      const token = generateToken(mockUser);
      const decoded = jwt.decode(token);
      
      expect(decoded.id).toBe(mockUser._id);
      expect(decoded.email).toBe(mockUser.email);
    });

    it('should create tokens that can be verified', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      
      expect(decoded.id).toBe(mockUser._id);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid tokens', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(mockUser._id);
    });

    it('should reject invalid tokens', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow();
    });
  });
});