/**
 * Simple in-memory rate limiter middleware.
 * Limits each IP to `max` requests per `windowMs` milliseconds.
 */
export const rateLimit = ({ windowMs = 60000, max = 30 } = {}) => {
    const hits = new Map();

    // Clean up old entries every minute
    setInterval(() => {
        const now = Date.now();
        for (const [key, data] of hits) {
            if (now - data.start > windowMs) hits.delete(key);
        }
    }, windowMs);

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const record = hits.get(ip);

        if (!record || now - record.start > windowMs) {
            hits.set(ip, { start: now, count: 1 });
            return next();
        }

        record.count++;
        if (record.count > max) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please try again later.'
            });
        }

        next();
    };
};

/**
 * Sanitize string input — strip HTML tags and trim whitespace.
 */
export const sanitize = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/<[^>]*>/g, '').trim();
};

/**
 * Sanitize all string fields in req.body
 */
export const sanitizeBody = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        for (const key of Object.keys(req.body)) {
            req.body[key] = sanitize(req.body[key]);
        }
    }
    next();
};
