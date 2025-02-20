CREATE MIGRATION m1dgcqwjkpk6polwix2acfuuxt4alfc4b4c65cmxn4cccwmzrr6oiq
    ONTO m1e5umr4hdzkvsnj7gpfkits4lzo5mkof6gr4js3s4eursnits25fa
{
  ALTER TYPE default::SurveyPart1 {
      CREATE REQUIRED PROPERTY referredFromTest: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
  ALTER TYPE default::SurveyPart2 {
      CREATE REQUIRED PROPERTY referredFromTest: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
};
