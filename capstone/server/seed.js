const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.REACT_APP_CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed:
    ("/seed",
    (req, res) => {
      sequelize
        .query(
          `DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS ward CASCADE;
        DROP TABLE IF EXISTS agenda CASCADE;
        DROP TABLE IF EXISTS messages CASCADE;
        DROP TABLE IF EXISTS posts CASCADE;
        DROP TABLE IF EXISTS tasks CASCADE;
        DROP TABLE IF EXISTS callings CASCADE;
        DROP TABLE IF EXISTS comments CASCADE;
        DROP TABLE IF EXISTS org CASCADE;
        DROP TABLE IF EXISTS notes CASCADE;
        DROP TABLE IF EXISTS proposed_callings CASCADE;
        
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          first_name varchar(75),
          last_name varchar(75),
          user_name varchar(150),
          user_email varchar(120),
          isAdmin BOOLEAN DEFAULT FALSE,
          user_initials varchar(3),
          user_avatar_color varchar(75),
          user_created_at timestamp,
          uid varchar(200)
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
          msg_text varchar(5000)
        );
        
        CREATE TABLE posts (
          post_id SERIAL PRIMARY KEY,
          posting_date timestamp,
          post_img BYTEA,
          post_txt varchar(5000)
        );
        
        CREATE TABLE tasks (
          task_id SERIAL PRIMARY KEY,
          task_description varchar(5000),
          task_created_at timestamp,
          task_due DATE DEFAULT (NOW() + interval '1 day'),
          task_isComplete BOOLEAN DEFAULT FALSE
        );
        
        CREATE TABLE callings (
          calling_id SERIAL PRIMARY KEY,
          calling_name varchar(75) DEFAULT 'General'
        );
        
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          comment_text varchar(500),
          comment_timestamp timestamp
        );
        
        CREATE TABLE org (
          org_id SERIAL PRIMARY KEY,
          org_name varchar(75)
        );
        
        CREATE TABLE notes (
          note_id SERIAL PRIMARY KEY,
          note_title varchar(75),
          note_text varchar(5000),
          note_timestamp timestamp
        );
        
        CREATE TABLE proposed_callings (
          proposed_id SERIAL PRIMARY KEY,
          proposed_calling varchar(75),
          proposed_name varchar(75),
          proposed_release_name varchar(75),
          proposed_needed_date DATE, 
          proposed_created_at timestamp,
          proposed_description varchar(1000),
          proposed_phase varchar(75) DEFAULT 'Approval',
          proposed_status varchar(75) DEFAULT 'New'
        );
        
        ALTER TABLE users
        ADD user_calling INT REFERENCES callings(calling_id),
        ADD user_org INT REFERENCES org(org_id),
        ADD user_ward INT REFERENCES ward(ward_id);
        
        ALTER TABLE messages
        ADD msg_author INT REFERENCES users(user_id),
        ADD msg_recipient INT REFERENCES users(user_id);
        
        ALTER TABLE posts
        ADD post_author_id INT REFERENCES users(user_id),
        ADD org_id INT REFERENCES org(org_id);
        
        ALTER TABLE tasks
        ADD task_org_id INT REFERENCES org(org_id),
        ADD task_author_id INT REFERENCES users(user_id),
        ADD task_assingee_id INT REFERENCES users(user_id);
        
        ALTER TABLE comments
        ADD comment_author INT REFERENCES users(user_id);
        
        ALTER TABLE callings
        ADD org_id INT REFERENCES org(org_id);
        
        ALTER TABLE org
        ADD org_agenda_id INT REFERENCES agenda(agenda_id);

        ALTER TABLE agenda
        ADD agenda_org_id INT REFERENCES org(org_id);
        
        ALTER TABLE proposed_callings
        ADD proposed_by INT NOT NULL REFERENCES users(user_id),
        ADD proposed_by_org INT NOT NULL REFERENCES org(org_id);
        
        ALTER TABLE notes
        ADD note_author_id INT REFERENCES users(user_id),
        ADD note_shared_with INT REFERENCES users(user_id),
        ADD note_org_id INT REFERENCES org(org_id);
        
        INSERT INTO ward(ward_id, ward_name)
        VALUES( 1, 'Ward 1');
        
        INSERT INTO agenda(agenda_id, agenda_text, agenda_updated_at, agenda_org_id)
        VALUES( 1, 'This is the agenda for the first week of the year for Developers', NOW(), (SELECT org_id from org where org_id = 1)), 
        ( 2, 'This is the agenda for the first week of the year for Project Managers', NOW(), (SELECT org_id from org where org_id = 2)), 
        ( 3, 'This is the agenda for the first week of the year for GENERAL TEAM', NOW(), (SELECT org_id from org where org_id = 3));
        
        INSERT INTO org(org_id, org_name, org_agenda_id)
        VALUES( 1, 'Developers', (SELECT agenda_id from agenda where agenda_id = 1)), 
        ( 2, 'Project Managers', (SELECT agenda_id from agenda where agenda_id = 2)), 
        ( 3, 'General Team', (SELECT agenda_id from agenda where agenda_id = 3));
        
        INSERT INTO callings(calling_id, calling_name, org_id)
        VALUES( 1, 'General', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 2, 'President', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 3, 'President Assistant 1', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 4, 'President Assistant 2', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 5, 'Secretary', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 6, 'Treasurer', (SELECT org_id FROM org WHERE org_id = 1)), 
        ( 7, 'Supervisor', (SELECT org_id FROM org WHERE org_id = 2)), 
        ( 8, 'Assistant 1', (SELECT org_id FROM org WHERE org_id = 2)), 
        ( 9, 'Assistant 2', (SELECT org_id FROM org WHERE org_id = 2)), 
        ( 10, 'Head Secretary', (SELECT org_id FROM org WHERE org_id = 2)), 
        ( 11, 'Secretary 1', (SELECT org_id FROM org WHERE org_id = 2)), 
        ( 12, 'Secretary 2', (SELECT org_id FROM org WHERE org_id = 2)),
        ( 13, 'General', (SELECT org_id FROM org WHERE org_id = 3));
        
        INSERT INTO users(user_id, first_name, last_name, user_name, user_email, isAdmin, user_calling, user_org, user_ward, user_initials, user_avatar_color, user_created_at, uid)
        VALUES( 1, 'John', 'Appleseed', 'John Appleseed', 'test@test.com', TRUE, (SELECT calling_id from callings where calling_id = 1), (SELECT org_id from org where org_id = 1), (SELECT ward_id from ward where ward_id = 1), 'JA', 'default', NOW(), 'svDpyZeVDpO4zzYDviHckbRvDqO2'),
        ( 2, 'Dane', 'Joe', 'Dane Joe', 'bebz@bebz.com', TRUE, (SELECT calling_id from callings where calling_id = 1), (SELECT org_id from org where org_id = 1), (SELECT ward_id from ward where ward_id = 1), 'JD', 'default', NOW(), 'UtkE7mZQCmg3jLuk2yDYGCb8VpI3');
        
        INSERT INTO proposed_callings(proposed_id, proposed_calling, proposed_name, proposed_release_name, proposed_needed_date, proposed_created_at, proposed_description, proposed_by, proposed_by_org, proposed_phase, proposed_status)
        VALUES( 1, 'CEO of Twitter', 'Elon Musk', 'Bill Gates', (NOW() + interval '3 weeks'), NOW(), 'This is the first proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'New'),
        (2, 'Poke Master', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the second proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'New'),
        (3, 'TV Host', 'Bob Barker', 'John Barker', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'New'),
        (4, 'Grammy Awards Night', 'Eddie Murphy', 'Will Smith', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'New'),
        (5, 'A-Team Member', 'Mr. T', 'Mr. S', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'New'),
        (6, 'Season', 'Mr. Spring', 'Mr. Winter', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Approved'),
        (7, 'Season', 'Mr. Summer', 'Mr. Spring', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Approved'),
        (8, 'Pokemon Master', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Approved'),
        (9, 'Gym Leader', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Pending'),
        (10, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Pending'),
        (11, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Pending'),
        (12, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Denied'),
        (13, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Denied'),
        (14, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Denied'),
        (15, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Approval', 'Denied'),
        (16, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Contacted'),
        (17, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Contacted'),
        (18, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Contacted'),
        (19, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Appt Set'),
        (20, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Appt Set'),
        (21, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Appt Set'),
        (22, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Pending'),
        (23, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Pending'),
        (24, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Pending'),
        (25, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Calling Accepted'),
        (26, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Contact', 'Calling Accepted'),
        (27, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Sustain & Set Apart', 'Sustained'),
        (28, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Sustain & Set Apart', 'Sustained'),
        (29, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Sustain & Set Apart', 'Set Apart'),
        (30, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'Sustain & Set Apart', 'Set Apart'),
        (31, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Need Update'),
        (32, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Need Update'),
        (33, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Need Update'),
        (34, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Need Update'),
        (35, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Need Update'),
        (36, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Updated'),
        (37, 'Friend to All Pokemon', 'Ash Ketchum', 'Gary Oaks', (NOW() + interval '3 weeks'), NOW(), 'This is the third proposed applicant', (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1), 'LCR', 'Updated');
        
        INSERT INTO tasks(task_id, task_description, task_created_at, task_due, task_org_id, task_author_id)
        VALUES( 1, 'Finish ironing out seed file', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 1), (SELECT user_id from users where user_id = 1)), 
        ( 2, 'complete backend', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 1), (SELECT user_id from users where user_id = 1)), 
        ( 3, 'figure out SQL', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 1), (SELECT user_id from users where user_id = 1)), 
        ( 4, 'figure out how to make my backend work', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 1), (SELECT user_id from users where user_id = 1)), 
        ( 5, 'optimize app', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 3), (SELECT user_id from users where user_id = 2)), 
        ( 6, 'add more app functionality', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 3), (SELECT user_id from users where user_id = 2)), 
        ( 7, 'make app pretty', NOW(), NOW() + interval '1 day', (SELECT org_id from org where org_id = 3), (SELECT user_id from users where user_id = 2));
        
        INSERT INTO notes(note_id, note_title, note_text, note_timestamp, note_author_id, note_org_id)
        VALUES( 1, 'Test Note', 'This is a test note', NOW(), (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1)), 
        ( 2, 'Some Random Note', 'lorem', NOW(), (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1) ), 
        ( 3, 'Thoughts about pluralsight', 'Pluralsight videos need some work....', NOW(), (SELECT user_id from users where user_id = 1), (SELECT org_id from org where org_id = 1)), 
        ( 4, 'THoughts about backend', 'Backend is a beast. Holy wow. I wanna conquer the beast though.', NOW(), (SELECT user_id from users where user_id = 2), (SELECT org_id from org where org_id = 1)), 
        ( 5, 'Meeting', 'This meeting is boring. I wish i were doing something ', NOW(), (SELECT user_id from users where user_id = 2), (SELECT org_id from org where org_id = 1)), 
        ( 6, 'Passwords', 'Super Secure Password: 123456; Other Secure Password: Password!', NOW(), (SELECT user_id from users where user_id = 2), (SELECT org_id from org where org_id = 1));          
        `
        )
        .then(() => {
          res.status(200).send("DB seeded");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }),
};
