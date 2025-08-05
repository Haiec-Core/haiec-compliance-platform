import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import React from 'react';

interface PolicyUpdateProps {
  userName: string;
  change1: string;
  change2: string;
  change3: string;
  policyLink: string;
}

const PolicyUpdate: React.FC<PolicyUpdateProps> = ({
  userName,
  change1,
  change2,
  change3,
  policyLink,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Important Policy Update - Action Required</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We are writing to inform you about a recent update to our organization's policies. These changes reflect our commitment to upholding the highest standards of professionalism, compliance, and safety.
          </Text>
          <Text style={textStyle}>
            In summary, the key updates include:
          </Text>
          <Section style={listStyle}>
            <Text style={listItemStyle}>1. {change1}</Text>
            <Text style={listItemStyle}>2. {change2}</Text>
            <Text style={listItemStyle}>3. {change3}</Text>
          </Section>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            To access the full updated policy document, please click the button below:
          </Text>
          <Section style={buttonContainerStyle}>
            <Button style={buttonStyle} href={policyLink}>
              Review Policy
            </Button>
          </Section>
          <Text style={textStyle}>
            We encourage you to take the time to review the revised policy thoroughly. If you have any questions or need further clarification, please contact our support team.
          </Text>
          <Text style={textStyle}>
            We appreciate your understanding and cooperation as we continue to improve our services to meet your needs.
          </Text>
          <Text style={signatureStyle}>Acme Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
  lineHeight: 1.6,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  textAlign: 'center',
  marginBottom: '20px',
};

const hrStyle: React.CSSProperties = {
  borderColor: '#e0e0e0',
  margin: '20px 0',
};

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginBottom: '16px',
};

const listStyle: React.CSSProperties = {
  marginLeft: '20px',
  marginBottom: '20px',
};

const listItemStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginBottom: '8px',
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
  padding: '12px 24px',
  display: 'inline-block',
};

const signatureStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333333',
  marginTop: '20px',
};

// @ts-ignore
PolicyUpdate.PreviewProps = {
  userName: 'John Doe',
  change1: 'Updated data retention policy',
  change2: 'New security protocols for remote access',
  change3: 'Revised code of conduct guidelines',
  policyLink: 'https://example.com/policy-update',
};

export default PolicyUpdate;
