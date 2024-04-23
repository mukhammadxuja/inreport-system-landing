import EmailVerificationAlert from "@/components/email-verification-alert";
import React from "react";

function AdminPage() {
  return (
    <div className="px-4">
      <div className="w-full max-w-2xl">
        <EmailVerificationAlert />
      </div>
    </div>
  );
}

export default AdminPage;
