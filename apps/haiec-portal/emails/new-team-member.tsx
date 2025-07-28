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

interface NewTeamMemberProps {
  teamLeaderName: string;
  newTeamMemberName: string;
  newMemberProfile: string;
  positionInTeam: string;
  newMember_firstName: string;
  managerEmail: string;
  appName: string;
}

const NewTeamMember: React.FC<NewTeamMemberProps> = ({
  teamLeaderName,
  newTeamMemberName,
  newMemberProfile,
  positionInTeam,
  newMember_firstName,
  managerEmail,
  appName,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Welcome New Team Member!</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {teamLeaderName},</Text>
          <Text style={textStyle}>
            We're excited to announce that <strong>{newTeamMemberName}</strong> has joined your team as a <strong>{positionInTeam}</strong>.
          </Text>
          <Section style={cardStyle}>
            <Text style={cardTextStyle}>
              <strong>New Team Member:</strong> {newTeamMemberName}<br />
              <strong>Position:</strong> {positionInTeam}<br />
              <strong>Manager:</strong> {teamLeaderName}
            </Text>
          </Section>
          <Text style={textStyle}>
            Please take a moment to welcome {newMember_firstName} and help them get settled in their new role.
          </Text>
          <Section style={buttonContainerStyle}>
            <Button href={newMemberProfile} style={buttonStyle}>
              View {newMember_firstName}'s Profile
            </Button>
          </Section>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            If you have any questions, please contact HR at {managerEmail}.
          </Text>
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

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
};

const cardTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#4a4a4a',
  lineHeight: '1.6',
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '30px 0',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: '#ffffff',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 20px',
};

const footerStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#8898aa',
  textAlign: 'center',
};

// @ts-ignore
NewTeamMember.PreviewProps = {
  teamLeaderName: 'John Doe',
  newTeamMemberName: 'Jane Smith',
  newMemberProfile: 'https://example.com/jane-smith',
  positionInTeam: 'Software Developer',
  newMember_firstName: 'Jane',
  managerEmail: 'hr@example.com',
  appName: 'Acme Inc.',
};

export default NewTeamMember;
