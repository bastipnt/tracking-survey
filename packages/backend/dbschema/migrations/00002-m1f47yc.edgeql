CREATE MIGRATION m1f47yczcof6vjeqpdwvtnlh5zla4z5plpx3q3hh3s3tpbqoyf7jca
    ONTO m1hut4pfut7wz3iqydthdrtjq5ctsits34efq337sxqnnfihuaviua
{
  ALTER TYPE default::Fingerprint {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET REQUIRED USING (<std::datetime>'2024-12-12T12:00:00+00');
      };
  };
  ALTER TYPE default::SurveyPart1 {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET REQUIRED USING (<std::datetime>'2024-12-12T12:00:00+00');
      };
  };
  ALTER TYPE default::SurveyPart2 {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET REQUIRED USING (<std::datetime>'2024-12-12T12:00:00+00');
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET REQUIRED USING (<std::datetime>'2024-12-12T12:00:00+00');
      };
  };
};
