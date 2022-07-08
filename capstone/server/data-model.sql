CREATE TABLE users (
  user_id uuid DEFAULT gen_random_uuid(),
  first_name varchar(75),
  last_name varchar(75),
  user_name varchar(150),
  user_email varchar(120),
  user_pwd varchar(255),
  isAdmin BOOLEAN DEFAULT FALSE,
  user_calling varchar(75) REFERENCES callings(calling_name),
  calling_id INT NOT NULL REFERENCES callings(calling_id),
  ward_id INT NOT NULL REFERENCES ward(ward_id),
  user_initials varchar(4),
  user_avatar_color varchar(75),
  user_created_at timestamp
);

CREATE TABLE ward (
  ward_id uuid DEFAULT gen_random_uuid(),
  ward_name varchar(75)
);

CREATE Table agenda (
  agenda_id SERIAL PRIMARY KEY,
  agenda_text varchar(10000),
  agenda_updated_at timestamp
);

CREATE Table messages (
  msg_id uuid DEFAULT gen_random_uuid(),
  msg_created_at timestamp,
  msg_text varchar(5000), 
  msg_author varchar(75) NOT NULL REFERENCES users(user_id),
  msg_recipient varchar(75) NOT NULL REFERENCES users(user_id)
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  posting_date timestamp,
  post_img BYTEA,
  post_txt varchar(5000),
  org_id INT NOT NULL REFERENCES org(org_id),
  org_name varchar(75) NOT NULL REFERENCES org(org_name),
  post_author varchar(75) NOT NULL REFERENCES users(user_name),
  post_author_id INT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  task_created_at timestamp,
  task_due DATE NOT NULL DEFAULT (NOW() + interval '1 day'),
  task_isComplete BOOLEAN DEFAULT FALSE,
  org_id INT NOT NULL REFERENCES org(org_id)
);

CREATE TABLE callings (
  calling_id SERIAL PRIMARY KEY,
  calling_name varchar(75) DEFAULT 'Child of God'
);

CREATE TABLE comments (
  comment_id uuid DEFAULT gen_random_uuid(),
  comment_text varchar(500),
  comment_timestamp timestamp,
  comment_author varchar(75) NOT NULL REFERENCES users(user_name)
);

CREATE TABLE org (
  org_id uuid DEFAULT gen_random_uuid(),
  org_name varchar(75),
  org_callings varchar (75) NOT NULL REFERENCES callings(calling_name),
  org_callings_id INT NOT NULL REFERENCES callings(calling_id),
  agenda_id INT NOT NULL REFERENCES agenda(agenda_id)
);

CREATE TABLE notes (
  note_id uuid DEFAULT gen_random_uuid(),
  note_title varchar(75),
  note_text varchar(5000),
  note_timestamp timestamp,
  note_author varchar(75) NOT NULL REFERENCES users(user_name)
);

---- Cleaned up Seed ---

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name varchar(75),
  last_name varchar(75),
  user_name varchar(150),
  user_email varchar(120),
  isAdmin BOOLEAN DEFAULT FALSE,
  user_calling INT REFERENCES callings(calling_id),
  user_ward INT REFERENCES ward(ward_id),
  user_initials varchar(3),
  user_avatar_color varchar(75),
  user_created_at timestamp
);

CREATE TABLE ward (
  ward_id SERIAL PRIMARY KEY,
  ward_name varchar(75)
);

CREATE Table agenda (
  agenda_id SERIAL PRIMARY KEY,
  agenda_text varchar(10000),
  agenda_updated_at timestamp
);

CREATE Table messages (
  msg_id SERIAL PRIMARY KEY,
  msg_created_at timestamp,
  msg_text varchar(5000), 
  msg_author INT REFERENCES users(user_id),
  msg_recipient INT REFERENCES users(user_id)
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  posting_date timestamp,
  post_img BYTEA,
  post_txt varchar(5000),
  org_id INT REFERENCES org(org_id),
  post_author_id INT REFERENCES users(user_id)
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  task_description varchar(5000),
  task_created_at timestamp,
  task_due DATE DEFAULT (NOW() + interval '1 day'),
  task_isComplete BOOLEAN DEFAULT FALSE,
  task_org_id INT REFERENCES org(org_id),
  task_author_id INT REFERENCES users(user_id),
  task_assingee_id INT REFERENCES users(user_id)
);

CREATE TABLE callings (
  calling_id SERIAL PRIMARY KEY,
  calling_name varchar(75) DEFAULT 'General'
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment_text varchar(500),
  comment_timestamp timestamp,
  comment_author INT REFERENCES users(user_id)
);

CREATE TABLE org (
  org_id SERIAL PRIMARY KEY,
  org_name varchar(75),
  org_callings_id INT REFERENCES callings(calling_id),
  org_agenda_id INT REFERENCES agenda(agenda_id)
);

CREATE TABLE notes (
  note_id SERIAL PRIMARY KEY,
  note_title varchar(75),
  note_text varchar(5000),
  note_timestamp timestamp,
  note_author_id INT REFERENCES users(user_id),
  note_shared_with INT REFERENCES users(user_id)
);

CREATE TABLE move_in_out (
move_id SERIAL PRIMARY KEY,
move_date timestamp,
move_name varchar(100),
move_type boolean,
move_phone varchar(50),
move_text_permission boolean,
move_email varchar(120),
move_email_permission boolean,
move_address varchar(100),
move_city varchar(70),
move_membership_record varchar(25), 
move_prev_ward varchar(75),
move_prev_bishop varchar(50),
move_birthday date,
move_spouse varchar(100),
move_family varchar(25),
move_languages varchar(75),
move_major varchar(75),
move_interests varchar(1000),
move_bio varchar(5000),
move_estimated_stay varchar(50),
move_prev_callings varchar(500),
move_calling_interest varchar(500),
move_new_address varchar(100),
move_new_city varchar(70),
move_new_state varchar(70),
move_new_zip varchar(15),
move_new_country varchar(75),
move_current_callings varchar(500),
move_additional_info varchar(500)
);