INSERT INTO public.user_roles (user_id, role)
VALUES
  ('cd456408-c2a2-48a4-874c-6642e62e7801', 'admin'),
  ('813a134a-b424-4ff1-a681-9b28d4a67686', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;