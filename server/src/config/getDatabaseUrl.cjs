const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/breakable-toy-launch31_development",
      test: "postgres://postgres:postgres@localhost:5432/breakable-toy-launch31_test",
      e2e: "postgres://postgres:postgres@localhost:5432/breakable-toy-launch31_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
