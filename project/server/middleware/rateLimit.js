// Simple in-memory rate limiting (in production, use Redis or similar)
const requestCounts = new Map();

export const rateLimitMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per 15 minutes
  
  // Clean old entries
  for (const [ip, data] of requestCounts.entries()) {
    if (now - data.resetTime > windowMs) {
      requestCounts.delete(ip);
    }
  }
  
  // Get or create request data for this IP
  let requestData = requestCounts.get(clientIP);
  if (!requestData) {
    requestData = {
      count: 0,
      resetTime: now
    };
    requestCounts.set(clientIP, requestData);
  }
  
  // Reset count if window has passed
  if (now - requestData.resetTime > windowMs) {
    requestData.count = 0;
    requestData.resetTime = now;
  }
  
  // Check if limit exceeded
  if (requestData.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((requestData.resetTime + windowMs - now) / 1000)
    });
  }
  
  // Increment count
  requestData.count++;
  
  next();
};