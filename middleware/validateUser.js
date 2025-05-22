export const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username.length < 6)
    return res.json({ message: 'Username should have atleast 6 characters' });
  if (password.length < 8)
    return res.json({ message: 'Password should have atleast 8 characters' });
  next();
};
