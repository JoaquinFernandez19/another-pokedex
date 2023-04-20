import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pnejhgrpcbwmwrkzovtd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWpoZ3JwY2J3bXdya3pvdnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTIxOTAsImV4cCI6MTk5NzQ4ODE5MH0.tH6M1qE524yfe1Nl5A-bFExqASNkdm3s_Z8Pvnlkniw"
);
