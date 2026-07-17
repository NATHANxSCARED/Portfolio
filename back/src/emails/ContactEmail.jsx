import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New contact message from your portfolio</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={heading}>New Contact Message</Text>
          <Hr style={hr} />
          
          <Text style={label}>From:</Text>
          <Text style={text}>{name}</Text>
          
          <Text style={label}>Email:</Text>
          <Link href={`mailto:${email}`} style={link}>
            {email}
          </Link>
          
          <Text style={label}>Subject:</Text>
          <Text style={text}>{subject}</Text>
          
          <Hr style={hr} />
          
          <Text style={label}>Message:</Text>
          <Text style={messageStyle}>{message}</Text>
          
          <Hr style={hr} />
          
          <Section style={buttonContainer}>
            <Button style={button} href={`mailto:${email}`}>
              Reply to {name}
            </Button>
          </Section>
        </Section>
        
        <Text style={footer}>
          This message was sent from your portfolio contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

ContactEmail.PreviewProps = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello!',
  message: 'This is a test message from the contact form.',
} as ContactEmailProps;

export default ContactEmail;

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '16px 0',
  padding: '0',
  color: '#1f2937',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '26px 0',
};

const label = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  margin: '16px 0 4px 0',
};

const text = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
  padding: '0',
};

const messageStyle = {
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap' as const,
  wordWrap: 'break-word' as const,
  margin: '0',
  padding: '12px',
  backgroundColor: '#f9fafb',
  borderRadius: '4px',
  border: '1px solid #e5e7eb',
};

const link = {
  color: '#0066cc',
  textDecoration: 'underline',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const button = {
  backgroundColor: '#0066cc',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  width: 'fit-content',
  margin: '0 auto',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  marginTop: '16px',
  padding: '0 48px',
  textAlign: 'center' as const,
};
