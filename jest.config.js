/** @type {import('jest').Config} */
const config = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],
};

module.exports = config;
