CREATE MIGRATION m1qj5uuugfgjfpqhscmqchzvunmqksqq4tpbe37wh3rxyis2fzin4a
    ONTO m1f47yczcof6vjeqpdwvtnlh5zla4z5plpx3q3hh3s3tpbqoyf7jca
{
  ALTER TYPE default::SurveyPart2 {
      ALTER PROPERTY gender12 {
          DROP CONSTRAINT std::one_of('diverse', 'male', 'female');
      };
  };
  ALTER TYPE default::SurveyPart2 {
      DROP PROPERTY gender12;
      CREATE REQUIRED PROPERTY pronouns12: std::str {
          SET REQUIRED USING (<std::str>'PreferNotToSay');
          CREATE CONSTRAINT std::one_of('She/her', 'He/him', 'They/them', 'Other', 'PreferNotToSay');
      };
  };
};
