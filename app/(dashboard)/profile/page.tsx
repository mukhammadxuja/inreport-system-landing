import React from "react";
import EmailVerificationAlert from "../../../components/email-verification-alert";

function Profile() {
  return (
    <div className="mt-20 container mx-auto">
      <EmailVerificationAlert />
    </div>
  );
}

export default Profile;
