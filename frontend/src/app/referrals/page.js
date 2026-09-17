import ReferralDashboard from '@/components/ReferralDashboard';

export const metadata = {
  title: 'Referral Program | Gym Meliora',
  description: 'Share your unique referral links and earn rewards'
};

export default function ReferralsPage() {
  // TODO: Replace with actual authentication/session data
  // In a real app, get these from your auth provider (NextAuth, Clerk, etc)
  const clientId = 'demo_client';
  const clientName = 'Demo Client';

  return (
    <main style={{ minHeight: '100vh', background: '#fafafa' }}>
      <ReferralDashboard
        clientId={clientId}
        clientName={clientName}
      />
    </main>
  );
}

/*
INTEGRATION GUIDE:

1. With NextAuth:
   import { getServerSession } from 'next-auth';
   const session = await getServerSession(authOptions);
   const clientId = session.user.id;
   const clientName = session.user.name;

2. With Clerk:
   'use client';
   import { useUser } from '@clerk/nextjs';
   export default function ReferralsPage() {
     const { user } = useUser();
     return <ReferralDashboard clientId={user.id} clientName={user.fullName} />;
   }

3. With Supabase:
   import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
   import { cookies } from 'next/headers';
   const supabase = createServerComponentClient({ cookies });
   const { data: { session } } = await supabase.auth.getSession();
   const clientId = session.user.id;

4. With custom auth:
   // Get user from your session/JWT/etc
   const clientId = getUserIdFromSession();
   const clientName = getUserNameFromSession();
*/
