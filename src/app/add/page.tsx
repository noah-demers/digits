import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddContactForm from '@/components/AddContactForm';


const AddContact = async () => {
 const session = await getServerSession(authOptions);
 loggedInProtectedPage(
   session as {
     user: { email: string; id: string; randomKey: string };
   } | null,
 );
 return (
   <main>
     <AddContactForm />
   </main>
 );
};


export default AddContact;