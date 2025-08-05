import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import React from 'react';

interface UserLeftAReviewProps {
  reviewLink: string;
  appName: string;
  makerName: string;
  nameOfReviewer: string;
  rating: string;
}

const UserLeftAReview: React.FC<UserLeftAReviewProps> = ({
  reviewLink,
  appName,
  makerName,
  nameOfReviewer,
  rating,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>New Review on {appName}</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {makerName},</Text>
          <Text style={textStyle}>
            We're excited to inform you that a user has recently reviewed your app, {appName}.
          </Text>
          <Text style={textStyle}>
            <strong>Reviewer:</strong> {nameOfReviewer}
            <br />
            <strong>Rating:</strong> {rating}
          </Text>
          <Text style={textStyle}>
            To view the full review, please click the button below:
          </Text>
          <Button style={buttonStyle} href={reviewLink}>
            View Review
          </Button>
          <Text style={textStyle}>
            Your attention to user feedback is greatly appreciated. Keep up the great work!
          </Text>
          <Text style={textStyle}>Best regards,</Text>
          <Text style={textStyle}>The {appName} Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  lineHeight: '1.5',
  padding: '20px 0',
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
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
UserLeftAReview.PreviewProps = {
  reviewLink: 'https://example.com/review',
  appName: 'Amazing App',
  makerName: 'Jane Doe',
  nameOfReviewer: 'John Smith',
  rating: '5 stars',
};

export default UserLeftAReview;
