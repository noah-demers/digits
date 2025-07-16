// src/app/list/page.tsx
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Contact } from '@/lib/validationSchemas';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';  // adjust path if needed

const ListPage = async () => {
  const session = await getServerSession(authOptions);

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  if (!session?.user?.email) {
    throw new Error('User email not found in session');
  }

  // Fetch contacts owned by the logged-in user
  const contacts: Contact[] = await prisma.contact.findMany({
    where: {
      owner: session.user.email,
    },
    orderBy: {
      lastName: 'asc',
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs="auto">
            <h2 className="text-center">Contacts</h2>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4 mt-3">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard contact={contact} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
