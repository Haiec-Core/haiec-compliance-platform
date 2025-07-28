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

interface ProjectApprovedProps {
  userName: string;
  projectName: string;
  organisationName: string;
  senderName: string;
  position: string;
  nextStepGuide: string;
  organisationMail: string;
  approver: string;
  positionOfApprover: string;
  dateOfApproval: Date;
}

const ProjectApproved: React.FC<ProjectApprovedProps> = ({
  userName,
  projectName,
  organisationName,
  organisationMail,
  senderName,
  position,
  approver,
  nextStepGuide,
  positionOfApprover,
  dateOfApproval,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Your project "{projectName}" has been approved!
          </Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We are pleased to inform you that your project submission to {organisationName} has been approved by {approver}, {positionOfApprover}, on {dateOfApproval.toLocaleDateString()}.
          </Text>
          <Text style={textStyle}>
            This is an exciting milestone, and we're looking forward to seeing your project come to life. To proceed with the next steps, please click the button below:
          </Text>
          <Button href={nextStepGuide} style={buttonStyle}>
            View Next Steps
          </Button>
          <Text style={textStyle}>
            If you have any questions or need further information, please don't hesitate to contact us at{' '}
            <Link href={`mailto:${organisationMail}`} style={linkStyle}>
              {organisationMail}
            </Link>
          </Text>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            Congratulations once again on your project approval!
          </Text>
          <Text style={textStyle}>
            Best regards,
            <br />
            {senderName}
            <br />
            {position}
            <br />
            {organisationName}
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

const linkStyle: React.CSSProperties = {
  color: '#0366d6',
  textDecoration: 'none',
};

// @ts-ignore
ProjectApproved.PreviewProps = {
  userName: 'John Doe',
  projectName: 'Innovative Solution',
  organisationName: 'TechCorp',
  senderName: 'Jane Smith',
  position: 'Project Manager',
  nextStepGuide: 'https://example.com/next-steps',
  organisationMail: 'support@techcorp.com',
  approver: 'Alice Johnson',
  positionOfApprover: 'Chief Innovation Officer',
  dateOfApproval: new Date('2023-07-15'),
};

export default ProjectApproved;
