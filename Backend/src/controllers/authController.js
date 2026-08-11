const authTest = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: {
      uid: req.user.uid,
      email: req.user.email || null,
    },
  });
};

export { authTest };