import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from 'react';

interface EmailConfirmationProps {
  appName: string;
  userName: string;
  supportEmail: string;
  confirmationLink: string;
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  appName,
  userName,
  supportEmail,
  confirmationLink,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Confirm Your Email Address</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            Thank you for signing up with {appName}.
          </Text>
          <Text style={textStyle}>
            To ensure the best service and security, we need to verify your email address. Please click the button below to confirm:
          </Text>
          <Button href={confirmationLink} style={buttonStyle}>
            Confirm Email
          </Button>
          <Text style={textStyle}>
            If you didn't sign up for an account with {appName} or if you have any questions, please contact our support team at{' '}
            <Link href={`mailto:${supportEmail}`} style={linkStyle}>
              {supportEmail}
            </Link>
            .
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Thank you for choosing {appName}.
          </Text>
          <Text style={footerStyle}>The {appName} Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f7fa',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 400,
  lineHeight: 1.5,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '40px',
  margin: '40px auto',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#333',
  textAlign: 'center',
  marginBottom: '20px',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  fontWeight: 700,
  fontSize: '16px',
  padding: '12px 30px',
  borderRadius: '4px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  margin: '20px 0',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'none',
};

const footerStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center',
  marginTop: '20px',
};

// @ts-ignore
EmailConfirmation.PreviewProps = {
  appName: 'Acme Inc.',
  userName: 'John Doe',
  supportEmail: 'support@acme.com',
  confirmationLink: 'https://acme.com/confirm-email',
};

export default EmailConfirmation;
