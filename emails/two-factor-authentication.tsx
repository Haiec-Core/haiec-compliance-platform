import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import React from 'react';

interface TwoFactorAuthenticationProps {
  userName: string;
  appName: string;
  supportEmail: string;
  logoUrl: string;
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = ({
  userName,
  appName,
  supportEmail,
  logoUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img src={logoUrl} alt={`${appName} logo`} width={120} height={50} />
          </Section>
          <Heading style={headingStyle}>Two-Factor Authentication Enabled</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We're writing to confirm that Two-Factor Authentication (2FA) has been successfully enabled on your {appName} account. This additional layer of security helps protect your account from unauthorized access.
          </Text>
          <Section style={infoBoxStyle}>
            <Text style={infoTextStyle}>
              🔐 Your account is now more secure with 2FA
            </Text>
          </Section>
          <Text style={textStyle}>
            If you did not initiate this change or have any concerns, please contact our support team immediately:
          </Text>
          <Button href={`mailto:${supportEmail}`} style={buttonStyle}>
            Contact Support
          </Button>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Thank you for prioritizing your account security.
          </Text>
          <Text style={footerStyle}>
            Best regards,<br />The {appName} Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
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

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
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

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: '#e8f5e9',
  borderRadius: '4px',
  padding: '15px',
  marginBottom: '20px',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#2e7d32',
  margin: 0,
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: '#ffffff',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 20px',
  margin: '20px 0',
};

const footerStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center',
};

// @ts-ignore
TwoFactorAuthentication.PreviewProps = {
  userName: 'John Doe',
  appName: 'SecureApp',
  supportEmail: 'support@secureapp.com',
  logoUrl: 'https://placehold.it/160x90',
};

export default TwoFactorAuthentication;
