INSERT INTO user_registration (user_id, fullName, email, password, confirmPassword) VALUES (1, 'muhammad zeeshan', 'mzee904904@gmail.com', 12345, 12345);

CREATE TABLE [IF NOT EXISTS] user_registration (
   user_id SERIAL PRIMARY KEY,
   fullName VARCHAR(255),
   email VARCHAR(255),
   password VARCHAR(255),
   confirmPassword VARCHAR(255)
);