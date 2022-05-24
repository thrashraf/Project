import cron from 'node-cron';
import activities from './model/activities.js';
import transporter from './config/nodemail.js';

//run everyday at 8 am
const checkDate = () =>
  cron.schedule('0 23 4 * * *', async () => {
    const [getAllActivities] = await activities.getAllActivities();

    getAllActivities.map((event) => {
      //this will check 14 days earlier for event date is today
      if (
        new Date(new Date(event.start) - 12096e5)
          .toLocaleString()
          .split(',')[0] === new Date(Date.now()).toLocaleString().split(',')[0]
      ) {
        const emailOptions = {
          from: 'samsjtmkpsmza@gmail.com',
          to: event.email,
          subject: `Peringatan aktiviti ${event.title}`,
          html: `
                      <p>Assalamualaikum dan Salam Sejahtera</p>
                      <p>Kepada ${event.username},</p>
                      <p>Peringatan aktiviti ${event.title} akan berlangsung dua minggu lagi pada tarikh ${event.start}.</p> 
                      
                      <p>Sekian, terima kasih.</p>
                `,
        };

        transporter.sendMail(emailOptions, (err, info) => {
          console.log(info);
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      }
    });
  });

export default checkDate;
