/** @class SNS event listeners that trigger transactional emails. */
import { EmailContent } from '../email/emailContent';

export default function Email(events) {
    var _emailContent = new EmailContent();

    /**
  * SNS event listener for a forgotten password request.
  * @param {string} email - recipients email address.
  * @param {object} mergeVars - set of variables that are used to populate the HTML content
  * @return {object} event trigger - send Mandrill mail
  */
    events.listen('Send Password Reset', async function (email, mergeVars) {
        console.log('events.listen Send Password Reset');
        let recipient = {
            email: email,
            name: ''
        };
        let resetId = mergeVars.filter(m => m.name == 'RP_ID')[0];
        let content = _emailContent.resetPassword(process.env.FE_DOMAIN + 'reset-password?id=' + resetId.content);
        return events.sendTransactionalEmail(recipient, 'Reset your password', content.header, content.bodyContent);
    });
}