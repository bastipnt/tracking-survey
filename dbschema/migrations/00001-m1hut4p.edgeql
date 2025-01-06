CREATE MIGRATION m1hut4pfut7wz3iqydthdrtjq5ctsits34efq337sxqnnfihuaviua
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY visitorId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Fingerprint {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY components: std::json;
  };
  CREATE TYPE default::SurveyPart1 {
      CREATE REQUIRED LINK user: default::User {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY IAmTrackedKnowledge4: std::str {
          CREATE CONSTRAINT std::one_of('no', 'yes');
      };
      CREATE REQUIRED PROPERTY howDoAdvertisersKnow2: std::str {
          CREATE CONSTRAINT std::one_of('no', 'yes');
      };
      CREATE REQUIRED PROPERTY knowledgeHowTracking6: std::str {
          CREATE CONSTRAINT std::one_of('no', 'yes');
      };
      CREATE REQUIRED PROPERTY knowledgeTargetedAds3: std::str {
          CREATE CONSTRAINT std::one_of('no', 'yes');
      };
      CREATE REQUIRED PROPERTY numLastWeeksAds1: std::str {
          CREATE CONSTRAINT std::one_of('none', 'once', 'sometimes', 'often');
      };
      CREATE REQUIRED PROPERTY okToBeTracked5: std::str {
          CREATE CONSTRAINT std::one_of('1', '2', '3', '4', '5');
      };
      CREATE MULTI PROPERTY trackingMethodsFamiliar7: std::str {
          CREATE CONSTRAINT std::one_of('ip-address', 'cookie', 'tracking-pixels', 'tracking-links', 'browser-fingerprinting');
      };
  };
  CREATE TYPE default::SurveyPart2 {
      CREATE REQUIRED LINK user: default::User {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY age10: std::str {
          CREATE CONSTRAINT std::one_of('less-than-18', '18-25', '25-40', 'more-than-40');
      };
      CREATE REQUIRED PROPERTY gender12: std::str {
          CREATE CONSTRAINT std::one_of('diverse', 'male', 'female');
      };
      CREATE REQUIRED PROPERTY interestInLearning8: std::str {
          CREATE CONSTRAINT std::one_of('yes', 'kinda', 'no');
      };
      CREATE REQUIRED MULTI PROPERTY learningApproaches9: std::str {
          CREATE CONSTRAINT std::one_of('reading-technical', 'reading-non-technical', 'video', 'art');
      };
      CREATE REQUIRED PROPERTY work11: std::str {
          CREATE CONSTRAINT std::one_of('student', 'working', 'school', 'other');
      };
  };
};
