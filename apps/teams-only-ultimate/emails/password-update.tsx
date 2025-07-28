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

interface PasswordUpdatedProps {
  userName: string;
  appName: string;
  supportEmail: string;
  passwordResetLink: string;
  signinPage: string;
}

const PasswordUpdated: React.FC<PasswordUpdatedProps> = ({
  userName,
  appName,
  supportEmail,
  passwordResetLink,
  signinPage,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Your password has been updated</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            This email is to confirm that the password for your {appName} account has been successfully updated.
          </Text>
          <Text style={textStyle}>Please login again to confirm:</Text>
          <Button href={signinPage} style={buttonStyle}>
            Log In
          </Button>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            If you did not request this password change, please secure your account immediately by{' '}
            <Link href={passwordResetLink} style={linkStyle}>
              resetting your password
            </Link>{' '}
            or contact our support team at{' '}
            <Link href={`mailto:${supportEmail}`} style={linkStyle}>
              {supportEmail}
            </Link>
            .
          </Text>
          <Text style={textStyle}>Thank you for using {appName}.</Text>
          <Text style={signatureStyle}>{appName} team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f7',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 300,
  lineHeight: 1.6,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  textAlign: 'center',
  margin: '0 0 20px',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e6e6e6',
  margin: '20px 0',
};

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '12px 30px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '4px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'underline',
};

const signatureStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  fontWeight: 'bold',
};

// @ts-ignore
PasswordUpdated.PreviewProps = {
  userName: 'John Doe',
  appName: 'My App',
  supportEmail: 'support@myapp.com',
  passwordResetLink: 'https://myapp.com/reset-password',
  signinPage: 'https://myapp.com/signin',
};

export default PasswordUpdated;
