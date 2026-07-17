import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}) => (
  React.createElement(Html, null,
    React.createElement(Head, null),
    React.createElement(Preview, null, 'New contact message from your portfolio'),
    React.createElement(Body, { style: main },
      React.createElement(Container, { style: container },
        React.createElement(Section, { style: box },
          React.createElement(Text, { style: heading }, 'New Contact Message'),
          React.createElement(Hr, { style: hr }),
          
          React.createElement(Text, { style: label }, 'From:'),
          React.createElement(Text, { style: text }, name),
          
          React.createElement(Text, { style: label }, 'Email:'),
          React.createElement(Link, { href: `mailto:${email}`, style: link }, email),
          
          React.createElement(Text, { style: label }, 'Subject:'),
          React.createElement(Text, { style: text }, subject),
          
          React.createElement(Hr, { style: hr }),
          
          React.createElement(Text, { style: label }, 'Message:'),
          React.createElement(Text, { style: messageStyle }, message),
          
          React.createElement(Hr, { style: hr }),
          
          React.createElement(Section, { style: buttonContainer },
            React.createElement(Button, { style: button, href: `mailto:${email}` }, `Reply to ${name}`)
          )
        ),
        
        React.createElement(Text, { style: footer }, 'This message was sent from your portfolio contact form.')
      )
    )
  )
);

export default ContactEmail;

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
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
  textAlign: 'center',
  marginTop: '32px',
};

const button = {
  backgroundColor: '#0066cc',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
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
  textAlign: 'center',
};
