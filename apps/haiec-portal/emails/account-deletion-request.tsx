import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface ConfirmAccountDeletionProps {
  deletionConfirmationLink: string;
  appName: string;
  userName: string;
  logoUrl?: string;
}

const ConfirmAccountDeletion: React.FC<ConfirmAccountDeletionProps> = ({
  deletionConfirmationLink,
  appName,
  userName,
  logoUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img
              src={logoUrl ?? `https://placehold.it/160x90`}
              alt={`${appName} logo`}
              width={160}
              height={90}
            />
          </Section>
          <Heading style={headingStyle}>Confirm Account Deletion</Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            You have requested to delete your account with {appName}. This
            action is irreversible and will result in the permanent deletion of
            your account and all associated data.
          </Text>
          <Text style={textStyle}>
            If you did not request this, please ignore this email. Otherwise,
            click the button below to confirm your account deletion:
          </Text>
          <Section style={buttonContainerStyle}>
            <Button style={buttonStyle} href={deletionConfirmationLink}>
              Confirm Account Deletion
            </Button>
          </Section>
          <Text style={textStyle}>
            If you have any questions or concerns, please contact our support
            team.
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
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  lineHeight: 1.5,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  margin: "20px 0",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#4a4a4a",
  marginBottom: "20px",
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: "center",
  margin: "30px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#ff4136",
  color: "#ffffff",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "12px 20px",
};

const footerStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#8898aa",
  textAlign: "center",
};

// @ts-ignore
ConfirmAccountDeletion.PreviewProps = {
  deletionConfirmationLink: "https://example.com/confirm-account-deletion",
  appName: "My App",
  userName: "John Doe",
  logoUrl: "https://placehold.it/120x50",
};

export default ConfirmAccountDeletion;
