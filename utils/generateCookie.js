const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // Prevent client-side scripts from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
  });
};

module.exports = setAuthCookie