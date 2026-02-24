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

Hvala Vam na porudžbini proizvoda sa Pčelinjaka Petrović!
Vaša porudžbina je uspešno primljena.

Detalji porudžbine:
${itemsList}

Ukupno za plaćanje (pouzećem): ${total} RSD

Očekujte poziv kurira u narednih 2-3 radna dana.
Hvala na poverenju!

Srdačan pozdrav,
Pčelinjak Petrović
Kontakt tel: 0600926196
`;

    // --- SLANJE EMAILA (NODEMAILER) ---
    
    // Konfiguracija transportera (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Tvoj email (iz .env.local fajla)
        pass: process.env.EMAIL_PASS, // Tvoja App Password šifra (iz .env.local fajla)
      },
    });

    try {
      // 1. Slanje EMAILA VLASNIKU (Tebi)
      await transporter.sendMail({
        from: '"Med Shop Sistem" <pcelinjakpetrovic2026@gmail.com>', // Pošiljalac
        to: 'pcelinjakpetrovic2026@gmail.com', // Primalac (TI)
        subject: `Nova porudžbina: ${customer.name} - ${total} RSD`,
        text: ownerEmailContent,
      });

      // 2. Slanje EMAILA KUPCU (Potvrda)
      await transporter.sendMail({
        from: '"Pčelinjak Petrović" <pcelinjakpetrovic2026@gmail.com>', 
        to: customer.email, 
        subject: 'Potvrda porudžbine - Pčelinjak Petrović',
        text: customerEmailContent,
      });

      console.log("Emailovi uspešno poslati!");
      
    } catch (emailError) {
      console.error("Greška prilikom slanja emaila:", emailError);
      // Ne prekidamo izvršenje ako email ne uspe, ali logujemo grešku
      // U produkciji možda želiš da obavestiš korisnika da email nije prošao, ali je porudžbina primljena
    }

    // Vraćamo uspeh frontendu
    return NextResponse.json({ message: 'Uspešno naručeno!' }, { status: 200 });

  } catch (error) {
    console.error('Greška u API ruti:', error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}
