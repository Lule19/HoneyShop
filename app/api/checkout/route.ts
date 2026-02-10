import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;

    // --- KREIRANJE SADRŽAJA EMAILA ---
    
    // 1. Priprema liste proizvoda za email
    const itemsList = items.map((item: any) => 
      `- ${item.title} (${item.quantity} kom) x ${item.price} RSD`
    ).join('\n');

    // 2. Tekst emaila za VLASNIKA (Tebe)
    const ownerEmailContent = `
NOVA PORUDŽBINA SA SAJTA!
----------------------------------------
KUPAC:
Ime: ${customer.name}
Adresa: ${customer.address}
Grad: ${customer.zip} ${customer.city}
Telefon: ${customer.phone}
Email: ${customer.email}
Napomena: ${customer.note || '/'}

PORUDŽBINA:
${itemsList}

UKUPNO: ${total} RSD
----------------------------------------
`;

    // 3. Tekst emaila za KUPCA
    const customerEmailContent = `
Poštovani/a ${customer.name},

Hvala Vam na porudžbini u Med Shop-u!
Vaša porudžbina je primljena i biće uskoro poslata.

Detalji porudžbine:
${itemsList}

Ukupno za plaćanje (pouzećem): ${total} RSD

Očekujte poziv kurira u narednih 2-3 dana.
Hvala na poverenju!
Med Shop Tim
`;

    // --- SLANJE EMAILA (NODEMAILER) ---
    
    // NAPOMENA: Da bi slanje emaila zaista radilo, potrebno je da uneseš
    // prave podatke od svog email naloga (npr. Gmail) u .env fajl.
    // Za sada, samo ispisujemo sadržaj emaila u konzolu (terminal) da bi video da radi.

    /* 
    // OVAKO BI IZGLEDAO PRAVI KOD ZA SLANJE (otkomentariši kad dodaš podatke):
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // tvojgmail@gmail.com
        pass: process.env.EMAIL_PASS, // tvoja App Password šifra (ne obična šifra!)
      },
    });

    // Slanje tebi
    await transporter.sendMail({
      from: '"Med Shop" <mojshop@gmail.com>',
      to: 'mojemail@gmail.com', // Tvoj email gde primaš porudžbine
      subject: `Nova porudžbina: ${customer.name} - ${total} RSD`,
      text: ownerEmailContent,
    });

    // Slanje kupcu
    await transporter.sendMail({
      from: '"Med Shop" <mojshop@gmail.com>',
      to: customer.email,
      subject: 'Potvrda porudžbine - Med Shop',
      text: customerEmailContent,
    });
    */

    // SIMULACIJA (briši ovo kad namestiš pravo slanje)
    console.log("==================================================");
    console.log("SIMULIRANO SLANJE EMAILA (check-out success):");
    console.log(ownerEmailContent);
    console.log("==================================================");

    // Vraćamo uspeh frontendu
    return NextResponse.json({ message: 'Uspešno naručeno!' }, { status: 200 });

  } catch (error) {
    console.error('Greška u API ruti:', error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}
