import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import React from "react";

interface YourRoleChangedProps {
  appName: string;
  teamMateName: string;
  effectiveDate: string;
  newRole: string;
  roleDescription: string;
  senderName: string;
  keyRoles: string[];
  position: string;
  oldRole: string;
}

const YourRoleChanged: React.FC<YourRoleChangedProps> = ({
  appName,
  teamMateName,
  effectiveDate,
  newRole,
  roleDescription,
  senderName,
  keyRoles,
  position,
  oldRole,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Role Change Notification</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {teamMateName},</Text>
          <Text style={textStyle}>
            We are writing to inform you that your role has been changed from <strong>{oldRole}</strong> to <strong>{newRole}</strong>, effective {effectiveDate}.
          </Text>
          <Text style={textStyle}>
            This change reflects our recognition of your skills and the evolving needs of our team. Your new role will involve the following key responsibilities:
          </Text>
          <ul style={listStyle}>
            {keyRoles.map((role, index) => (
              <li key={index} style={listItemStyle}>{role}</li>
            ))}
          </ul>
          <Text style={textStyle}>
            To view the full details of your new role, please click the button below:
          </Text>
          <Section style={buttonContainerStyle}>
            <Button pX={20} pY={12} style={buttonStyle} href={roleDescription}>
              View Role Description
            </Button>
          </Section>
          <Text style={textStyle}>
            We are confident that you will excel in this new position and continue to contribute significantly to our team's success. If you have any questions or concerns, please don't hesitate to reach out.
          </Text>
          <Text style={textStyle}>Best regards,</Text>
          <Text style={textStyle}>
            {senderName}
            <br />
            {position}
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            © {new Date().getFullYear()} {appName}. All rights reserved.
          </Text>
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

const listStyle: React.CSSProperties = {
  paddingLeft: '20px',
  marginBottom: '20px',
};

const listItemStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '30px 0',
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
};

const footerStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center',
};

// @ts-ignore
YourRoleChanged.PreviewProps = {
  appName: "TechCorp",
  teamMateName: "John Doe",
  effectiveDate: "July 1, 2024",
  newRole: "Senior Developer",
  roleDescription: "https://example.com/role-description",
  senderName: "Jane Smith",
  keyRoles: ["Lead development projects", "Mentor junior developers", "Contribute to technical strategy"],
  position: "HR Manager",
  oldRole: "Developer",
};

export default YourRoleChanged;
