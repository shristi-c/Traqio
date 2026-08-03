const getHealthStatus = () => {
  return {
    success: true,
    message: "Traqio Backend Running 🚀",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  };
};

export { getHealthStatus };