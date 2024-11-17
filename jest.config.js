module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@middleware/(.*)$': '<rootDir>/src/app/middlewares/$1',
    '^@router/(.*)$': '<rootDir>/src/app/routes/$1',
    '^@service/(.*)$': '<rootDir>/src/app/services/$1',
  },
};
