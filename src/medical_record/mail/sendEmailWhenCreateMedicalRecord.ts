import MailSender from '../../Notifications/Email/EmailService';
import NodemailerMailTransporter from '../../Notifications/Email/emailConfig';
import { MailSetting } from '../../Notifications/Email/MailSetting';
import { IIntializeMail } from '../../Notifications/IIntializeMail';

class sendEmailWhenCreateMedicalRecord implements IIntializeMail {
    private readonly mailSettingBook = MailSetting
    public IntializeMail(Data: object) {
        const mailTransporter = new NodemailerMailTransporter(this.mailSettingBook);
        const mailSender = new MailSender(mailTransporter);
        mailSender.Email = {
            from: 'waelelsafty07@gmail.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Congratulation New Book Added',
            html: `<div style="color:green; font-weight:bold">New Record ${JSON.stringify(Data)} </div>`,
        };
        return mailSender;
    }
}

export default sendEmailWhenCreateMedicalRecord