export const validateUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 6) {
    return res.status(400).json({
      message: 'Username must be at least 6 characters long',
    });
  }

  if (!password || typeof password !== 'string' || password.trim().length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long',
    });
  }

  next();
};
