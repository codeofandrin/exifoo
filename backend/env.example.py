import os

# used for sentry logging. If True, no sentry logging.
os.environ["IS_DEV"] = "True"

# used for saving license and free trial data inside keychain
os.environ["STORAGE_KEY"] = "YOUR_KEYCHAIN_STORAGE_KEY"
# used for machine ID validation (not used anymore, therefore can be empty)
os.environ["SUPABASE_URL"] = "YOUR_SUPABASE_URL"
os.environ["SUPABASE_KEY"] = "YOUR_SUPABASE_KEY"
# used for sentry logging
os.environ["SENTRY_DSN"] = "YOUR_SENTRY_DSN"
