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
  sequelize,
  seed:
    ("/seed",
    async (req, res) => {
      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }

      sequelize
        .query(
          `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS ward CASCADE;
        DROP TABLE IF EXISTS agenda CASCADE;
        DROP TABLE IF EXISTS messages CASCADE;
        DROP TABLE IF EXISTS posts CASCADE;
        DROP TABLE IF EXISTS tasks CASCADE;
        DROP TABLE IF EXISTS callings CASCADE;
        DROP TABLE IF EXISTS comments CASCADE;
        DROP TABLE IF EXISTS org CASCADE;
        DROP TABLE IF EXISTS notes CASCADE;

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
            calling_name varchar(75) DEFAULT 'General'
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
        
          INSERT INTO users(user_id, first_name, last_name, user_name, user_email, user_pwd, isAdmin, user_calling, calling_id, ward_id, user_initials, user_avatar_color, user_created_at)
          VALUES( 1, 'Josue', 'Arredondo', 'Josue Arredondo', 'test@test.com', 'testing', TRUE, 'Child of God', 1, 1, 'JA', 'default', NOW());
  
            INSERT INTO ward(ward_id, ward_name)
                    VALUES( 1, 'Ward 1');

            INSERT INTO callings(calling_id, calling_name)
                    VALUES( 1, 'General');

            INSERT INTO org(org_id, org_name, org_callings, org_callings_id, agenda_id)
                    VALUES( 1, 'Bishopric', 'General', 1, 1);

            INSERT INTO agenda(agenda_id, agenda_text, agenda_updated_at)
                    VALUES( 1, 'This is the agenda for the first week of the year', NOW());

            INSERT INTO tasks(task_id, task_created_at, task_due, org_id)
                    VALUES( 1, NOW(), NOW() + interval '1 day', 1);

            INSERT INTO notes(note_id, note_title, note_text, note_timestamp, note_author)
                    VALUES( 1, 'Test Note', 'This is a test note', NOW(), 'Josue Arredondo');
        `
        )
        .then(() => {
          res.status(200).send("Table seeded");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }),
};
