CREATE MIGRATION m1fvdslggqk3nanycpggtouf6ye7g6nz3wncckagt7ho2tbaqinfda
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY visitorId: std::str;
  };
  CREATE TYPE default::fingerprint {
      CREATE LINK user: default::User;
      CREATE PROPERTY values: std::json;
  };
  CREATE TYPE default::survey {
      CREATE LINK user: default::User;
      CREATE PROPERTY answers: std::json;
  };
};
