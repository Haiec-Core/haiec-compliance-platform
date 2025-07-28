import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface YourRoleInOrganisationChangedProps {
  organisationName: string;
  organisationMember: string;
  newRole: string;
  oldRole: string;
  roleDescription: string;
  personIncharge: string;
  position: string;
  senderName: string;
}

const YourRoleInOrganisationChanged: React.FC<YourRoleInOrganisationChangedProps> = ({
  organisationName,
  organisationMember,
  newRole,
  oldRole,
  roleDescription,
  personIncharge,
  position,
  senderName,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Role Change Notification</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {organisationMember},</Text>
          <Text style={textStyle}>
            We are pleased to inform you that your role within {organisationName} has been updated.
          </Text>
          <Text style={textStyle}>
            <strong>Previous Role:</strong> {oldRole}<br />
            <strong>New Role:</strong> {newRole}
          </Text>
          <Text style={textStyle}>
            This change has been approved by {personIncharge}.
          </Text>
          <Text style={textStyle}>
            To view the full details of your new role, please click the button below:
          </Text>
          <Button pX={20} pY={12} style={buttonStyle} href={roleDescription}>
            View Role Description
          </Button>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            We value your contributions to our organization and look forward to your continued success in this new capacity.
          </Text>
          <Text style={textStyle}>
            If you have any questions or need further clarification, please don't hesitate to reach out to your supervisor or HR department.
          </Text>
          <Text style={signatureStyle}>
            Best regards,<br />
            {senderName}<br />
            {position}<br />
            {organisationName}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'normal',
  margin: 0,
  padding: '20px',
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px',
};

const headingStyle: React.CSSProperties = {
  color: '#333333',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e0e0e0',
  margin: '20px 0',
};

const textStyle: React.CSSProperties = {
  color: '#555555',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '20px',
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

const signatureStyle: React.CSSProperties = {
  ...textStyle,
  fontStyle: 'italic',
};

// @ts-ignore
YourRoleInOrganisationChanged.PreviewProps = {
  organisationName: 'Acme Inc.',
  organisationMember: 'John Doe',
  newRole: 'Senior Manager',
  oldRole: 'Manager',
  roleDescription: 'https://example.com/role-description',
  personIncharge: 'Jane Smith',
  position: 'HR Director',
  senderName: 'Robert Johnson',
};

export default YourRoleInOrganisationChanged;
