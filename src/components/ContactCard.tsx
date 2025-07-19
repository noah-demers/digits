'use client';


import { Card } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';  // <-- import Link here
import { Contact } from '@/lib/validationSchemas';


type ContactCardProps = {
 contact: Contact;
};


const ContactCard = ({ contact }: ContactCardProps) => {
 return (
   <Card className="h-100">
     <Card.Header className="d-flex align-items-center">
       <div style={{ width: 75, height: 75, position: 'relative', marginRight: '1rem' }}>
         <Image
           src={contact.image}
           alt={`${contact.firstName} ${contact.lastName}`}
           fill
           style={{ objectFit: 'cover', borderRadius: '50%' }}
           sizes="75px"
         />
       </div>
       <div>
         <Card.Title className="mb-0">
           {contact.firstName} {contact.lastName}
         </Card.Title>
         <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
       </div>
     </Card.Header>
     <Card.Body>
       <Card.Text>{contact.description}</Card.Text>
     </Card.Body>
     <Card.Footer>
       <Link href={`/edit/${contact.id}`}>Edit</Link>
     </Card.Footer>
   </Card>
 );
};


export default ContactCard;