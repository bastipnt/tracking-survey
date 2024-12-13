CREATE MIGRATION m1e5umr4hdzkvsnj7gpfkits4lzo5mkof6gr4js3s4eursnits25fa
    ONTO m1qj5uuugfgjfpqhscmqchzvunmqksqq4tpbe37wh3rxyis2fzin4a
{
  ALTER TYPE default::SurveyPart1 {
      ALTER LINK user {
          DROP CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::SurveyPart2 {
      ALTER LINK user {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
