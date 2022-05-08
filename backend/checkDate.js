import cron from 'node-cron';
import activities from "./model/activities.js";
import transporter from './config/nodemail.js';

//run everyday at 8 am
const checkDate = () => cron.schedule('0 25 17 * * *', async () => {

    const [getAllActivities] = await activities.getAllActivities();

    getAllActivities.map(event => {
        //this will check 14 days earlier for event date is today 
        if (new Date (event.start - 12096e5) === new Date(Date.now())) {
            console.log('yes')

            const emailOptions = {
                from: 'samsjtmkpsmza@gmail.com',
                to: event.email,
                subject: `Peringatan aktiviti ${event.title}`,
                html: `
                      <p>Assalamualaikum dan Salam Sejahtera</p>
                      <p>Kepada ${evnet.username},</p>
                      <p>Peringatan aktiviti ${event.title} akan berlangsung dua minggu lagi.</p> 
                      
                      <p>Sekian, terima kasih.</p>
                `
              }
          
              transporter.sendMail(emailOptions, (err, info) => {
                if (err) {
                  console.log(err)
                } 
              })
        }

        console.log('lol')
    })
})


export default checkDate;