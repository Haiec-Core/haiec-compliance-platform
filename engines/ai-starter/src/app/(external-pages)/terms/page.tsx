import { T } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Placeholder",
  description: "Example structure for Terms of Service page",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <T.H1>Terms of Service (Placeholder)</T.H1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>1. Example Section</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            This is an example of how a section in your Terms of Service might
            be structured. Replace this text with your actual terms and
            conditions.
          </T.P>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>2. Placeholder Content</T.H2>
          </CardTitle>
          <CardTitle>
            <T.H2>2. Use of Service</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            You agree to use our service only for lawful purposes and in
            accordance with these Terms of Service. You are prohibited from
            violating or attempting to violate the security of the service.
          </T.P>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>3. Intellectual Property</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            The service and its original content, features, and functionality
            are owned by us and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property or
            proprietary rights laws.
          </T.P>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>4. Termination</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            We may terminate or suspend your access to our service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms of Service.
          </T.P>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>5. Limitation of Liability</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            In no event shall we be liable for any indirect, incidental,
            special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the service.
          </T.P>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <T.H2>6. Changes to Terms</T.H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <T.P>
            We reserve the right to modify or replace these Terms of Service at
            any time. It is your responsibility to check these Terms
            periodically for changes. Your continued use of the service
            following the posting of any changes constitutes acceptance of those
            changes.
          </T.P>
        </CardContent>
      </Card>
    </div>
  );
}
