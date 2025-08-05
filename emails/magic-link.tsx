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

interface MagicLinkProps {
  appName: string;
  userName: string;
  supportEmail: string;
  magicLink: string;
}

const MagicLink: React.FC<MagicLinkProps> = ({
  appName,
  userName,
  supportEmail,
  magicLink,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Magic link from {appName}</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Hello {userName},</Text>
          <Text style={textStyle}>
            You've requested a magic link to sign into {appName}. Please
            find it below:
          </Text>
          <Button href={magicLink} style={buttonStyle}>
            Sign In
          </Button>
          <Text style={textStyle}>
            Clicking on this button will instantly log you into your account.
            For your security, please note that this link will expire in 24
            hours, or once you've used it to log in.
          </Text>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            If you didn't request this link or if you have any questions,
            please contact us at{' '}
            <Link href={`mailto:${supportEmail}`} style={linkStyle}>
              {supportEmail}
            </Link>
          </Text>
          <Text style={textStyle}>Enjoy exploring {appName}!</Text>
          <Text style={textStyle}>The {appName} team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  lineHeight: 1.5,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  margin: '20px 0',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e6ebf1',
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
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px 20px',
  margin: '30px auto',
  width: '200px',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'underline',
};

// @ts-ignore
MagicLink.PreviewProps = {
  appName: 'Acme App',
  userName: 'John Doe',
  supportEmail: 'support@acme.com',
  magicLink: 'https://example.com/magic-link',
};

export default MagicLink;
