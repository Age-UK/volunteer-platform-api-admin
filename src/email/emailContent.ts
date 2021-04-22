/** @class HTML content for transactional emails. */
'use strict';
export class EmailContent {

    /**
   * Return HTML for reset password email.  Assumes underlying Mandrill template includes two varaibles *|HEADER|* and *|CONTENT|*
   *
   * @param {resetUrl} URL for reset password form.
   * @return {object} Object containing header/footer.
   */
    resetPassword(resetUrl) {
        return { header : "Reset your password", 
        bodyContent: "<p>Please click the link below to reset your password.</p><p>This link will expire in one hour.</p><p><a href=" + resetUrl + ">Reset Password</a></p>"
        };
    }
}