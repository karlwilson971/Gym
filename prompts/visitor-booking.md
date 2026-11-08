# PulseFit: Visitor Class Booking Prompt

```text
PULSEFIT VISITOR BOOKING: Add a simple way for a non-member visitor to reserve a spot in a gym class without creating an account. Treat “visitor” as a guest/non-member. Use the existing PulseFit class-booking experience as the starting point; preserve the current visual design, responsive layout, animations, and member booking behavior.

Before changing code, inspect the existing class page, app state, API routes, and database schema. Explain a short implementation plan, then build and test the feature end to end.

EXISTING APP CONTEXT
- PulseFit is a React + Vite app using Tailwind CSS, Framer Motion, lucide-react, and Recharts.
- Class booking is on the Classes screen: visitors can browse the weekly schedule, Yoga/HIIT/Spin/Boxing, coaches, times, rooms, and spots left.
- The current demo persists app state through local storage and an optional Neon-backed `/api/state` endpoint. There is no user authentication; a browser ID is not a security boundary.
- Follow the existing component, toast, accessibility, and styling patterns. Do not introduce a login requirement for guest booking.

VISITOR EXPERIENCE
1. Make a clearly labeled “Book as a visitor” option available from the Classes screen. Keep the existing “Book” action for current app users. A guest must be able to reach class selection and complete a reservation without signing up or logging in.
2. Let the visitor choose an available class from the existing schedule. Show class name, date, time, duration, coach, location, and remaining capacity before confirmation.
3. Collect only the details needed to manage the reservation: visitor’s full name, email, and phone number. Validate required fields and email format; show accessible inline errors and preserve entered values when validation fails.
4. Show a clear review step before submitting. On success, show a confirmation with a booking reference and class details, and make it clear that no payment or account creation is required.
5. Provide a way to look up or cancel a visitor reservation using its reference and email, if supported safely by the implementation. Do not expose visitor contact details in public class listings or browser-visible shared state.
6. Handle full classes, stale availability, duplicate submissions, network/database errors, and successful cancellation with clear feedback. Disable submission while a request is in flight.
7. Keep the experience usable on mobile and with a keyboard/screen reader. Use labels, focus management for dialogs, visible focus states, and appropriate status/error announcements.

DATA AND SAFETY
- Inspect the existing persistence model before implementation. Do not treat the browser-generated client ID or local storage as secure identity or authoritative class capacity.
- Store visitor reservations server-side using the existing Neon connection only on the server. Add a focused schema migration/table and API endpoints if needed; never expose DATABASE_URL or private contact data in client code or logs.
- Validate and normalize all submitted fields server-side. Enforce class capacity atomically so concurrent guest requests cannot overbook a class. Prevent duplicate requests from creating duplicate reservations.
- Return only the reservation details needed by that visitor. Protect lookup/cancellation with an unpredictable booking reference plus email verification; do not allow enumeration of reservations.
- If a production-safe server-side reservation cannot be completed with the current setup, do not pretend a local-only booking is confirmed. Explain the limitation and implement the safest clearly labeled demo behavior instead.
- Do not add payment processing, marketing opt-ins, or unrelated features.

TEST AND VERIFY
- Add or update tests for valid guest booking, invalid/missing fields, unavailable/full class, capacity enforcement, duplicate submission, lookup/cancellation, and server/database errors.
- Verify existing member booking and class filters still work.
- Run the project’s available checks and `npm run build`; fix errors introduced by the feature.
- Check the Classes screen at desktop and 375px mobile width; confirm there is no horizontal overflow and booking feedback is accessible.
- Do not change unrelated screens or redesign PulseFit.

When finished, summarize what changed, how to test a visitor booking, any database migration/environment setup required, and anything that remains demo-only.
```