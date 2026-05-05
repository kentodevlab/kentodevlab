import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/admin-supabase';

const TO_EMAIL = process.env.CONTACT_EMAIL || 'hola@kento-devlab.com';

const servicioLabels: Record<string, string> = {
  web: 'Desarrollo Web',
  saas: 'SaaS / WebApp',
  ecommerce: 'E-commerce',
  maintenance: 'Mantenimiento',
  other: 'Otro',
};

async function sendEmail(name: string, email: string, phone: string | null, company: string | null, service: string, budget: string, message: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY no configurada');
    return;
  }
  
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    console.log('Enviando email a:', process.env.CONTACT_EMAIL);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'hola@kento-devlab.com',
      subject: `Nuevo mensaje de ${name} - ${servicioLabels[service] || service}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
        <p><strong>Servicio:</strong> ${servicioLabels[service] || service}</p>
        <p><strong>Presupuesto:</strong> ${budget}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    console.log('Email enviado correctamente');
  } catch (err) {
    console.error('Error al enviar email:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

    if (!name || !email || !service || !budget || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('mensajes_contacto')
      .insert({
        nombre: name,
        email,
        telefono: phone || null,
        empresa: company || null,
        servicio: service,
        presupuesto: budget,
        mensaje: message,
        leido: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error al guardar mensaje' }, { status: 500 });
    }

    await sendEmail(name, email, phone, company, service, budget, message);

    // Forward lead to CRM for agent automation
    const crmBase = (process.env.CRM_API_BASE_URL ?? 'https://crm.kentodevlab.com').replace(/\/$/, '');
    fetch(`${crmBase}/api/public/landing/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'origin': 'https://kentodevlab.com' },
      body: JSON.stringify({
        fullName: name,
        email,
        phone: phone || undefined,
        businessName: company || undefined,
        serviceInterest: service,
        budgetRange: budget,
        message,
        preferredChannel: phone ? 'whatsapp' : 'email',
        locale: 'es',
      }),
    }).catch(err => console.error('CRM lead forward failed:', err));

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}