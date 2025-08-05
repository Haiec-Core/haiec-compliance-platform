import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

interface TeamInvitationEmailProps {
  viewInvitationUrl: string;
  workspaceName: string;
  inviterName: string;
  isNewUser: boolean;
}

export default function TeamInvitationEmail({
  viewInvitationUrl,
  workspaceName,
  inviterName,
  isNewUser,
}: TeamInvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Team Invitation</Heading>
          <Hr style={hrStyle} />
          {isNewUser ? (
            <>
              <Text style={textStyle}>
                Hello, you have been invited to join the team{' '}
                <strong>{workspaceName}</strong>. Your account has been created and you can
                confirm your email address and join the team by clicking the button
                below.
              </Text>
              <Text style={textStyle}>
                You will be able to set your password after confirming your email
                address in the security settings page.
              </Text>
            </>
          ) : (
            <Text style={textStyle}>
              Hello, <strong>{inviterName}</strong> has invited you to join the team{' '}
              <strong>{workspaceName}</strong>.
            </Text>
          )}
          <Section style={buttonContainerStyle}>
            <Button style={buttonStyle} href={viewInvitationUrl}>
              View Invitation
            </Button>
          </Section>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            © {new Date().getFullYear()} {workspaceName}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

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

const buttonContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '30px 0',
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
TeamInvitationEmail.PreviewProps = {
  viewInvitationUrl: 'https://example.com/view-invitation',
  workspaceName: 'Acme Inc.',
  inviterName: 'John Doe',
  isNewUser: false,
};

