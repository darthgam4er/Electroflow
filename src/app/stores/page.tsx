
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Clock } from 'lucide-react';

const stores = [
    {
        name: "Electroplanet Casablanca",
        address: "Morocco Mall, Boulevard de la Corniche, Casablanca",
        phone: "+212 522 79 79 79",
        email: "casablanca@electroplanet.ma",
        hours: "Lundi - Dimanche: 10:00 - 22:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.736915077255!2d-7.671868384797621!3d33.58623098074338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3ab1a1a1a1b%3A0x8f2f6f3b4c4f3b3b!2sMorocco%20Mall!5e0!3m2!1sen!2sma!4v1678886400000"
    },
    {
        name: "Electroplanet Rabat",
        address: "Arribat Center, Avenue Mohammed VI, Rabat",
        phone: "+212 537 77 77 77",
        email: "rabat@electroplanet.ma",
        hours: "Lundi - Dimanche: 10:00 - 22:00",
        mapSrc: ""
    },
     {
        name: "Electroplanet Marrakech",
        address: "Carré Eden, Avenue Mohammed V, Marrakech",
        phone: "+212 524 44 44 44",
        email: "marrakech@electroplanet.ma",
        hours: "Lundi - Dimanche: 10:00 - 22:00",
        mapSrc: ""
    }
]

export default function StoresPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Nos Magasins</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            {stores.map((store) => (
                 <Card key={store.name}>
                    <CardHeader>
                        <CardTitle>{store.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>{store.address}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{store.phone}</span>
                        </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{store.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{store.hours}</span>
                        </div>
                    </CardContent>
                 </Card>
            ))}
        </div>
        <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[400px] lg:h-full">
                <iframe
                    src={stores[0].mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </Card>
        </div>
      </div>
    </div>
  );
}
