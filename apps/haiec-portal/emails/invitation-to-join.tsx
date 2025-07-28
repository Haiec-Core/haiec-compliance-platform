import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface InvitationToJoinProps {
  nameOfOrganisation: string;
  recipientName: string;
  deadLine: Date;
  senderName: string;
}

const InvitationToJoin: React.FC<InvitationToJoinProps> = ({
  nameOfOrganisation,
  recipientName,
  senderName,
  deadLine
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Invitation to join {nameOfOrganisation}
          </Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {recipientName},</Text>
          <Text style={textStyle}>
            {senderName} has invited you to join {nameOfOrganisation}. We're excited to have you on board!
          </Text>
          <Text style={textStyle}>
            Please note that this invitation expires on {deadLine.toLocaleDateString()}.
          </Text>
          <Button
            href="#"
            style={buttonStyle}
          >
            Accept Invitation
          </Button>
          <Text style={textStyle}>
            If you have any questions, feel free to reach out to our support team.
          </Text>
          <Text style={textStyle}>Best regards,</Text>
          <Text style={signatureStyle}>
            Richard<br />
            CEO<br />
            {nameOfOrganisation}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f8',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  lineHeight: 1.5,
};

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  margin: '0 0 20px',
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
  color: 'white',
  padding: '12px 20px',
  borderRadius: '4px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  margin: '20px 0',
};

const signatureStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#666',
  fontStyle: 'italic',
};

// @ts-ignore
InvitationToJoin.PreviewProps = {
  nameOfOrganisation: 'Acme Inc.',
  recipientName: 'John Doe',
  senderName: 'Jane Smith',
  deadLine: new Date('2024-08-01'),
};

export default InvitationToJoin;
