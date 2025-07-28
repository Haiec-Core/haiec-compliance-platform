import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface RecentLoginProps {
  userName: string;
  appName: string;
  deviceType: string;
  timeOfLogin: Date;
  dayOfLogin: string;
  supportEmail: string;
}

const RecentlyLoggedInDevices: React.FC<RecentLoginProps> = ({
  userName,
  appName,
  deviceType,
  timeOfLogin,
  dayOfLogin,
  supportEmail,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>New Login Device Detected</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We noticed a recent login to your {appName} account from a new device.
            We're sending this email to ensure it was you.
          </Text>

          <Container style={infoContainerStyle}>
            <Text style={infoTextStyle}>
              <strong>Device:</strong> {deviceType}
            </Text>
            <Text style={infoTextStyle}>
              <strong>Time:</strong> {timeOfLogin.toLocaleTimeString()}
            </Text>
            <Text style={infoTextStyle}>
              <strong>Day:</strong> {dayOfLogin}
            </Text>
          </Container>

          <Hr style={hrStyle} />
          <Text style={textStyle}>
            If this wasn't you, we highly recommend you secure your account immediately.
            You can change your password by clicking the following button:
          </Text>
          <Button href="" style={buttonStyle}>
            Change My Password
          </Button>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            Thank you for using {appName}.
          </Text>
          <Text style={textStyle}>Best Regards,</Text>
          <Text style={textStyle}>{appName} Team</Text>
          <Text style={footerStyle}>
            If you need assistance, please contact us at {supportEmail}
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

const infoContainerStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  padding: '20px',
  marginBottom: '20px',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginBottom: '10px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
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
  marginTop: '20px',
};

// @ts-ignore
RecentlyLoggedInDevices.PreviewProps = {
  userName: "John Doe",
  appName: "MyApp",
  deviceType: "iPhone 12",
  timeOfLogin: new Date(),
  dayOfLogin: "Monday",
  supportEmail: "support@myapp.com"
};

export default RecentlyLoggedInDevices;
