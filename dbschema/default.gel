module default {
  type User {
    required visitorId: str {
      constraint exclusive;
    };
    required createdAt: datetime;
  }

  type Fingerprint {
    required user: User;
    required createdAt: datetime;
    required components: json;
  }

  type SurveyPart1 {
    required user: User;
    required createdAt: datetime;
    required numLastWeeksAds1: str {
      constraint one_of ("none", "once", "sometimes", "often");
    };
    required howDoAdvertisersKnow2: str {
      constraint one_of ("no", "yes");
    };
    required knowledgeTargetedAds3: str {
      constraint one_of ("no", "yes");
    };
    required IAmTrackedKnowledge4: str {
      constraint one_of ("no", "yes");
    };
    required okToBeTracked5: str {
      constraint one_of ("1", "2", "3", "4", "5");
    };
    required knowledgeHowTracking6: str {
      constraint one_of ("no", "yes");
    };
    multi trackingMethodsFamiliar7: str {
      constraint one_of ("ip-address", "cookie", "tracking-pixels", "tracking-links", "browser-fingerprinting");
    };
    required referredFromTest: bool;
  }

  type SurveyPart2 {
    required user: User;
    required createdAt: datetime;
    required interestInLearning8: str {
      constraint one_of ("yes", "kinda", "no");
    };
    required multi learningApproaches9: str {
      constraint one_of ("reading-technical", "reading-non-technical", "video", "art");
    };
    required age10: str {
      constraint one_of ("less-than-18", "18-25", "25-40", "more-than-40");
    };
    required work11: str {
      constraint one_of ("student", "working", "school", "other");
    };
    required pronouns12: str {
      constraint one_of ("She/her", "He/him", "They/them", "Other", "PreferNotToSay");
    };
    required referredFromTest: bool;
  }
}
