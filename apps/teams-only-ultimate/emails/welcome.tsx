import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import React from "react";

interface WelcomeEmailProps {
  appName: string;
  userName: string;
  purposeOfApp: string;
  makerName: string;
  positionInTeam: string;
  linkToApp: string;
  supportEmail: string;
  socialMediaLinks: {
    twitter: string;
    facebook: string;
  };
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName,
  userName,
  purposeOfApp,
  makerName,
  positionInTeam,
  linkToApp,
  supportEmail,
  socialMediaLinks,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Welcome to {appName}!</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We're thrilled to welcome you to {appName}. Your account has been successfully created and is ready to use.
          </Text>
          <Text style={textStyle}>
            Our mission is to help you {purposeOfApp}. We're excited to be part of your journey!
          </Text>
          <Button href={linkToApp} style={buttonStyle}>
            Get Started
          </Button>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            Need help? Our support team is here for you at <Link href={`mailto:${supportEmail}`} style={linkStyle}>{supportEmail}</Link>.
          </Text>
          <Text style={textStyle}>
            Stay updated:
            <Link href={socialMediaLinks.twitter} style={linkStyle}> Twitter</Link> |
            <Link href={socialMediaLinks.facebook} style={linkStyle}> Facebook</Link>
          </Text>
          <Text style={textStyle}>
            Thank you for choosing {appName}. We're excited to have you on board!
          </Text>
          <Text style={signatureStyle}>{makerName}</Text>
          <Text style={positionStyle}>{positionInTeam}</Text>
          <Text style={companyStyle}>{appName} Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 300,
  margin: 0,
  padding: '20px 0',
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '40px',
};

const headingStyle: React.CSSProperties = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '32px',
  margin: '0 0 20px',
  textAlign: 'center',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e6e6e6',
  margin: '30px 0',
};

const textStyle: React.CSSProperties = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  borderRadius: '4px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '20px 0',
  padding: '12px 24px',
  textAlign: 'center',
  textDecoration: 'none',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'none',
};

const signatureStyle: React.CSSProperties = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '30px 0 5px',
};

const positionStyle: React.CSSProperties = {
  color: '#666',
  fontSize: '14px',
  margin: '0 0 5px',
};

const companyStyle: React.CSSProperties = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

// @ts-ignore
WelcomeEmail.PreviewProps = {
  appName: 'Awesome App',
  userName: 'John Doe',
  purposeOfApp: 'streamline your workflow',
  makerName: 'Jane Smith',
  positionInTeam: 'Founder & CEO',
  linkToApp: 'https://awesomeapp.com/start',
  supportEmail: 'support@awesomeapp.com',
  socialMediaLinks: {
    twitter: 'https://twitter.com/awesomeapp',
    facebook: 'https://facebook.com/awesomeapp',
  },
};

export default WelcomeEmail;
