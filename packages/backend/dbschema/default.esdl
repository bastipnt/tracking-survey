module default {
  type User {
    required visitorId: str;
  }

  type Fingerprint {
    user: User;
    values: json;
  }

  type Survey {
    user: User;
    answers: json;
  }
}
