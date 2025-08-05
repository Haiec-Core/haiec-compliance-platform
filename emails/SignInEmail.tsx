import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

interface SignInEmailProps {
  signInUrl: string;
  companyName: string;
  userName: string;
  logoUrl: string;
}

const SignInEmail: React.FC<SignInEmailProps> = ({
  signInUrl,
  companyName,
  userName,
  logoUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img src={logoUrl} alt={`${companyName} logo`} width={160} height={50} />
          </Section>
          <Heading style={headingStyle}>Sign In to Your Account</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Hello {userName},</Text>
          <Text style={textStyle}>
            We kindly invite you to access your account by signing in with the link
            provided below.
          </Text>
          <Section style={buttonContainerStyle}>
            <Button style={buttonStyle} href={signInUrl}>
              Sign In Now
            </Button>
          </Section>
          <Text style={textStyle}>
            If you didn't request this sign-in link, please ignore this email.
          </Text>
          <Text style={textStyle}>
            Thank you for choosing our platform, and we look forward to serving you!
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Warm regards,<br />
            {companyName} Customer Success Team
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

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
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
SignInEmail.PreviewProps = {
  signInUrl: 'https://example.com/signin',
  companyName: 'Nextbase',
  userName: 'John Doe',
  logoUrl: 'https://placehold.it/160x50',
};

export default SignInEmail;
