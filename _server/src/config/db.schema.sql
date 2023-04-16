-- DATABASE
-- [x] Create database
-- CREATE DATABASE "issue-tracker";

-- Script to clear entire database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;

-- [x] Create extension for uuid generation  
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- [ ] user_notification_types
-- [ ] user_achievement_types
-- [x] project_status_types
-- [x] project_activity_types
-- [ ] project_permission_types ?
-- [x] issue_status_types
-- [x] issue_priority_types
-- [ ] issue_activity_types
-- [ ] team_activity_types

-- Creates a table for project status types
CREATE TABLE IF NOT EXISTS project_status_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  color VARCHAR(32) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO project_status_types (rank_order, name, description, color) 
VALUES
  (0, 'Not Started', 'Currently not started', '#000'),
  (1, 'Open', 'Currently open', '#2559f8'),
  (2, 'Paused', 'Project paused', '#f76c05'),
  (3, 'Completed', 'Project complete', '#009250');

-- UPDATE project_status_types 
-- SET color = '#2559f8' WHERE name = 'Open';

-- Creates a table for project activity types
CREATE TABLE IF NOT EXISTS project_activity_types (
  id UUID DEFAULT uuid_generate_v4(),
  name varchar(32) UNIQUE NOT NULL, 
  description varchar(255) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO project_activity_types (name, description)
VALUES
  ('CREATED', 'created this project'), 
  ('UPDATED_NAME', 'changed the name of the project'), 
  ('UPDATED_DESCRIPTION', 'changed the description of the project'), 
  ('UPDATED_STATUS', 'changed the status of the project'), 
  ('UPDATED_START_DATE', 'changed the start date of the project'),
  ('UPDATED_END_DATE', 'updated the end date of the project'),
  ('CREATED_ISSUE', 'created a new issue'),
  ('UPDATED_ISSUE', 'updated an issue'),
  ('DELETED_ISSUE', 'deleted an issue'),
  ('CREATED_ISSUE_ATTACHMENT', 'added an attachment to an issue'),
  ('DELETED_ISSUE_ATTACHMENT', 'deleted an attachment from an issue'),
  ('CREATED_ISSUE_COMMENT', 'added a comment to an issue'),
  ('UPDATED_ISSUE_COMMENT', 'updated a comment on an issue'),
  ('DELETED_ISSUE_COMMENT', 'deleted a comment from an issue'),
  ('CREATED_TASK', 'created a new task'),
  ('UPDATED_TASK', 'updated a task'),
  ('DELETED_TASK', 'deleted a task'),
  ('CREATED_MEMBER', 'added a new member'),
  ('DELETED_MEMBER', 'removed project member');

CREATE TABLE IF NOT EXISTS issue_activity_types (
  id UUID DEFAULT uuid_generate_v4(),
  name varchar(32) UNIQUE NOT NULL, 
  description varchar(255) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO issue_activity_types (name, description)
VALUES
  ('CREATED_ISSUE', 'user created issue'), 
  ('UPDATED_ISSUE_NAME', 'updated issue name'), 
  ('UPDATED_ISSUE_DESCRIPTION', 'updated issue description'), 
  ('UPDATED_ISSUE_STATUS', 'updated issue status'), 
  ('UPDATED_ISSUE_PRIORITY', 'updated issue priority'),
  ('UPDATED_ISSUE_DUE_DATE', 'updated issue due date'),
  ('UPDATED_REPORTER', 'updated reporter'),
  ('UPDATED_ASSIGNEE', 'updated assignee'),
  ('CREATED_TASK', 'created task'),
  ('UPDATED_TASK', 'updated task'),
  ('DELETED_TASK', 'deleted task'),
  ('CREATED_ISSUE_ATTACHMENT', 'created issue attachment'),
  ('DELETED_ISSUE_ATTACHMENT', 'deleted issue attachment'),
  ('CREATED_ISSUE_COMMENT', 'created issue comment'),
  ('UPDATED_ISSUE_COMMENT', 'updated issue comment'),
  ('DELETED_ISSUE_COMMENT', 'deleted issue comment');

-- Creates a table for issue status types
CREATE TABLE IF NOT EXISTS issue_status_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  color VARCHAR(32) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO issue_status_types (rank_order, name, description, color) 
VALUES
  (0, 'To Do', 'You still have to do issues', '#8e241b'),
  (1, 'In Progress', 'Issue is currently in progress', '#2559f8'),
  (2, 'In Review', 'Issue is In Review', '#2559f8'),
  (3, 'Done', 'Issue is resolved and done', '#009250');

-- Creates a table for issue priority types
CREATE TABLE IF NOT EXISTS issue_priority_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO issue_priority_types (rank_order, name, description)
VALUES 
  (0, 'Lowest', 'Issue with the least priority'),
  (1, 'Low', 'Issue with low priority'),
  (2, 'Medium', 'Issue with medium priority'),
  (3, 'High', 'Issue with high priority'),
  (4, 'Highest', 'Issue with maximum priority');

-- Creates a table for proejct member roles
CREATE TABLE IF NOT EXISTS project_member_roles (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO 
  project_member_roles (name, description)
VALUES
  ('admin', 'Administrator'),
  ('member', 'Member');

-- Creates a table for users
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL,
  photo_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

-- Creates a table for projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) DEFAULT 'Untitled',
  description VARCHAR(4000),
  status UUID,
  owner_id UUID,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (status) REFERENCES project_status_types(id)
);

-- Creates a table for project_members
CREATE TABLE IF NOT EXISTS project_members (
  id UUID DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL,
  member_id UUID NOT NULL,
  member_role UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (member_role) REFERENCES project_member_roles(id),
  
  UNIQUE (project_id, member_id)
);

CREATE TABLE IF NOT EXISTS project_activities (
  id UUID DEFAULT uuid_generate_v4(),
  type_id UUID NOT NULL,
  project_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (type_id) REFERENCES project_activity_types(id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Creates a table for issues
CREATE TABLE IF NOT EXISTS issues (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) DEFAULT 'Untitled',
  description VARCHAR(4000),
  status UUID,
  priority UUID,
  reporter_id UUID,
  project_id UUID,
  assignee_id UUID,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES issue_status_types(id),
  FOREIGN KEY (priority) REFERENCES issue_priority_types(id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (reporter_id) REFERENCES project_members(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_id) REFERENCES project_members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS issue_tasks (
  id UUID DEFAULT uuid_generate_v4(),
  description VARCHAR(255),
  issue_id UUID,
  member_id UUID,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES project_members(id)
);

CREATE TABLE IF NOT EXISTS issue_comments (
  id UUID DEFAULT uuid_generate_v4(),
  description VARCHAR(255),
  issue_id UUID,
  member_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES project_members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS issue_attachments (
  id UUID DEFAULT uuid_generate_v4(),
  filename VARCHAR(255),
  original_filename VARCHAR(255),
  content_type VARCHAR(255),
  path VARCHAR(1000),
  bucket VARCHAR(255),
  variant VARCHAR(255),
  owner_id UUID,
  issue_id UUID,

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES project_members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4(),
  member_role UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  PRIMARY KEY (id),
  FOREIGN KEY (member_role) REFERENCES team_member_roles(id)
);

CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  team_leader UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);
