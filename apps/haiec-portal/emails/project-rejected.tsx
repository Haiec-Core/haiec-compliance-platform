import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from "react";

interface ProjectRejectedProps {
  projectName: string;
  appMaker: string;
  organisationName: string;
  senderName: string;
  position: string;
  approver: string;
  positionOfApprover: string;
  dateOfRejection: Date;
}

const ProjectRejected: React.FC<ProjectRejectedProps> = ({
  projectName,
  appMaker,
  organisationName,
  senderName,
  approver,
  positionOfApprover,
  dateOfRejection,
  position,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Project Rejection Notice</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {appMaker},</Text>
          <Text style={textStyle}>
            We regret to inform you that your project "{projectName}" submitted to {organisationName}
            has been rejected by {approver}, our {positionOfApprover}, on {dateOfRejection.toLocaleDateString()}.
          </Text>
          <Text style={textStyle}>
            After careful consideration, we have determined that the project does not align
            with our current objectives and priorities. This decision was not made lightly,
            and we appreciate the effort you put into your submission.
          </Text>
          <Text style={textStyle}>
            We encourage you to continue developing your innovative ideas and exploring other
            opportunities for support and collaboration.
          </Text>
          <Text style={textStyle}>
            Thank you for your interest in {organisationName}. We wish you success in your future endeavors.
          </Text>
          <Hr style={hrStyle} />
          <Text style={signatureStyle}>
            Sincerely,
            <br />
            {senderName}
            <br />
            {position}
            <br />
            {organisationName}
          </Text>
          <Button href="#" style={buttonStyle}>View Details</Button>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
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

const signatureStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#4a4a4a',
  marginTop: '20px',
  fontStyle: 'italic',
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

// @ts-ignore
ProjectRejected.PreviewProps = {
  projectName: "Innovative App",
  appMaker: "John Doe",
  organisationName: "Tech Innovations Inc.",
  senderName: "Jane Smith",
  position: "Project Manager",
  approver: "Michael Johnson",
  positionOfApprover: "CEO",
  dateOfRejection: new Date(),
};

export default ProjectRejected;
