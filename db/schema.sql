CREATE TABLE IF NOT EXISTS pulsefit_app_state (
  client_id UUID PRIMARY KEY,
  state JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);