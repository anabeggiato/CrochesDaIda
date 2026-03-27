function getMissingEnvVars(requiredVars) {
  return requiredVars.filter((envVarName) => !process.env[envVarName]);
}

function assertRequiredEnvVars(requiredVars) {
  const missingEnvVars = getMissingEnvVars(requiredVars);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
}

module.exports = {
  assertRequiredEnvVars,
  getMissingEnvVars,
};
