# SA.TORQ customer accounts — activation checklist

This branch adds a dedicated account page and a minimal SIGN UP / LOGIN link in the homepage header. Existing catalog/navigation content is otherwise preserved.

## Required before authentication can work

The static site is hosted on GitHub Pages, so it needs a managed authentication backend. The account page is wired to Supabase Auth, but **real registration/login will remain disabled until the project configuration is supplied**.

1. Create a Supabase project at https://supabase.com/dashboard.
2. In Project Settings → API, copy the Project URL and the anon/publishable key.
3. Put them in auth-config.js as SATORQ_SUPABASE_URL and SATORQ_SUPABASE_ANON_KEY.
   - Never use or publish a service_role/secret key in browser code.
4. In Supabase Authentication → URL Configuration, set the Site URL to https://asallam979-cmd.github.io/sallamtorq.
5. Add these redirect URLs:
   - https://asallam979-cmd.github.io/sallamtorq/account.html
   - https://asallam979-cmd.github.io/sallamtorq/account.html?mode=reset
6. Configure email delivery for production and customize the confirmation/reset email templates.
7. Test sign-up confirmation, login, logout, and password reset on desktop and mobile.

The page supports email/password sign-up, email confirmation, login, logout, and password reset/update. No guest checkout flow is changed or blocked by this branch. Orders, loyalty points, and service history are not yet connected to a database.

## Security notes

- Passwords are handled by Supabase Auth; this site does not store raw passwords.
- Do not store private keys in the repository.
- Before collecting customer information or using marketing email, publish a privacy policy and obtain appropriate consent.
