/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./lib/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://interview_owner:UKO58HnagWBw@ep-frosty-sunset-a5tbceww.us-east-2.aws.neon.tech/quizzer?sslmode=require',
    }
  };