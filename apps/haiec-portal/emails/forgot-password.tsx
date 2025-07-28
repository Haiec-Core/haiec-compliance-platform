import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import React from "react";

interface ForgotPasswordProps {
  appName: string;
  userName: string;
  resetLink: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  appName,
  userName,
  resetLink,
}) => {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Password Reset Request for {appName}
          </Heading>
          <Hr style={hrStyle} />
          <Text style={textStyle}>Dear {userName},</Text>
          <Text style={textStyle}>
            We received a request to reset the password for your {appName}{" "}
            account. If you initiated this password reset, please click the
            button below to create a new password:
          </Text>
          <Container style={buttonContainerStyle}>
            <Button href={resetLink} style={buttonStyle}>
              Reset Password
            </Button>
          </Container>
          <Text style={textStyle}>
            Please note that this link is valid for 24 hours from the time you
            received this email. If you did not request this change, please
            disregard this email and your password will remain unchanged.
          </Text>
          <Text style={textStyle}>
            For security reasons, we recommend creating a strong, unique
            password that you don't use for other websites or applications.
          </Text>
          <Text style={textStyle}>Thank you for using {appName}.</Text>
          <Text style={textStyle}>Best Regards,</Text>
          <Text style={textStyle}>The {appName} Team</Text>
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
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
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
  backgroundColor: "#007bff",
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
ForgotPassword.PreviewProps = {
  appName: "MyApp",
  userName: "John Doe",
  resetLink: "https://example.com/reset-password",
};

export default ForgotPassword;
