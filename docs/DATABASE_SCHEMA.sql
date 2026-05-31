CREATE TABLE users (
  id UUID PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE learner_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  current_level TEXT NOT NULL DEFAULT 'A1',
  goal TEXT NOT NULL DEFAULT 'Pass Goethe A1',
  exam_target TEXT,
  hours_per_week INT DEFAULT 7,
  xp INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  study_hours NUMERIC DEFAULT 0
);

CREATE TABLE learner_memory (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  memory_type TEXT NOT NULL,
  content JSONB NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL,
  score INT,
  completed_at TIMESTAMPTZ
);

CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  level TEXT NOT NULL,
  reading_score INT,
  listening_score INT,
  writing_score INT,
  speaking_score INT,
  passed BOOLEAN,
  rubric JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

