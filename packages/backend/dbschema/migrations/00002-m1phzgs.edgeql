CREATE MIGRATION m1phzgsr7ig3sn6c72bs63wljqr46r7ytqi3pkdegrhrsnyxskpnua
    ONTO m1fvdslggqk3nanycpggtouf6ye7g6nz3wncckagt7ho2tbaqinfda
{
  ALTER TYPE default::fingerprint RENAME TO default::Fingerprint;
  ALTER TYPE default::survey RENAME TO default::Survey;
};
