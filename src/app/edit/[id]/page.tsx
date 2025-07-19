import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Contact } from '@/lib/validationSchemas';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';

type Params = {
  params: { id: string | string[] };
};

export default async function EditContactPage({ params }: Params) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Parse ID from params
  const id = Number(Array.isArray(params?.id) ? params.id[0] : params.id);
  if (isNaN(id)) {
    return notFound();
  }

  // Fetch contact by id
  const contact: Contact | null = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    return notFound();
  }

  // Optionally: Check that current user owns this contact before editing
  if (contact.owner !== session?.user?.email) {
    // Not owner, redirect or show 404
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}

